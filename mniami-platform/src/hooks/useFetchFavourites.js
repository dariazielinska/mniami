import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { doc, getDoc, collection } from 'firebase/firestore'
import { firestore } from '../firebaseConfig'

export const useFetchFavourites = () => {
  const { currentUser } = useAuth()
  const [favourites, setFavourites] = useState({ recipes: [], articles: [] })
  const [recipeDetails, setRecipeDetails] = useState({})
  const [articleDetails, setArticleDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFavourites = async () => {
      if (currentUser) {
        try {
          const favDocRef = doc(firestore, 'favourites', currentUser.uid)
          const favDoc = await getDoc(favDocRef)

          if (favDoc.exists()) {
            const data = favDoc.data()
            setFavourites({
              recipes: data.recipes || [],
              articles: data.articles || [],
            })

            const recipeCollection = collection(firestore, 'recipes')
            const recipesPromises = data.recipes.map((id) =>
              getDoc(doc(recipeCollection, id))
            )
            const recipesDocs = await Promise.all(recipesPromises)
            const recipesData = recipesDocs.reduce((acc, doc) => {
              if (doc.exists()) acc[doc.id] = doc.data()
              return acc
            }, {})
            setRecipeDetails(recipesData)

            const articleCollection = collection(firestore, 'articles')
            const articlesPromises = data.articles.map((id) =>
              getDoc(doc(articleCollection, id))
            )
            const articlesDocs = await Promise.all(articlesPromises)
            const articlesData = articlesDocs.reduce((acc, doc) => {
              if (doc.exists()) acc[doc.id] = doc.data()
              return acc
            }, {})
            setArticleDetails(articlesData)
          }
        } catch (e) {
          setError(e)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchFavourites()
  }, [currentUser])

  return { favourites, recipeDetails, articleDetails, loading, error }
}
