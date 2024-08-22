import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { firestore } from '../firebaseConfig'
import { collection, doc, getDoc } from 'firebase/firestore'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

function Favourites() {
  const { currentUser } = useAuth()
  const [favourites, setFavourites] = useState({ recipes: [], articles: [] })
  const [recipeDetails, setRecipeDetails] = useState({})
  const [articleDetails, setArticleDetails] = useState({})

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
          console.error('Error fetching favourites: ', e)
        }
      }
    }

    fetchFavourites()
  }, [currentUser])

  return (
    <div>
      <Header />
      ZAKŁADKA ULUBIONE
      <h2>Favourite Recipes</h2>
      {favourites.recipes.length === 0 ? (
        <p>No favourite recipes found.</p>
      ) : (
        <ul>
          {favourites.recipes.map((recipeId) => (
            <li key={recipeId}>
              {recipeDetails[recipeId]
                ? recipeDetails[recipeId].title
                : 'Loading...'}
            </li>
          ))}
        </ul>
      )}
      <h2>Favourite Articles</h2>
      {favourites.articles.length === 0 ? (
        <p>No favourite articles found.</p>
      ) : (
        <ul>
          {favourites.articles.map((articleId) => (
            <li key={articleId}>
              {articleDetails[articleId]
                ? articleDetails[articleId].title
                : 'Loading...'}
            </li>
          ))}
        </ul>
      )}
      <Footer />
    </div>
  )
}

export default Favourites
