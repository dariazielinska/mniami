import { useState, useEffect } from 'react'
import { firestore } from '../firebaseConfig'
import { collection, query, getDocs } from 'firebase/firestore'

export const useFetchRecipesList = () => {
  const [recipes, setRecipes] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const q = query(collection(firestore, 'recipes'))
        const querySnapshot = await getDocs(q)

        let allRecipes = {}
        querySnapshot.forEach((doc) => {
          allRecipes[doc.id] = doc.data().title
        })

        setRecipes(allRecipes)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  return { recipes, loading, error }
}
