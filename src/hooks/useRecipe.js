import { useState, useEffect } from 'react'
import { firestore } from '../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

export const useRecipe = (id) => {
  const [recipe, setRecipe] = useState(null)
  const [ingredientsDetails, setIngredientsDetails] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = doc(firestore, 'recipes', id)
        const recipeSnap = await getDoc(recipeRef)

        if (recipeSnap.exists()) {
          const recipeData = recipeSnap.data()
          setRecipe(recipeData)
          const ingredientIds = recipeData.ingredients.map((ing) => ing.id)
          if (ingredientIds.length > 0) {
            const ingredientsPromises = ingredientIds.map(
              async (ingredientId) => {
                const ingredientRef = doc(
                  firestore,
                  'ingredients',
                  ingredientId
                )
                const ingredientSnap = await getDoc(ingredientRef)
                if (ingredientSnap.exists()) {
                  return { id: ingredientSnap.id, ...ingredientSnap.data() }
                } else {
                  console.log(`Ingredient with ID ${ingredientId} not found`)
                  return null
                }
              }
            )

            const fetchedIngredients = (
              await Promise.all(ingredientsPromises)
            ).filter((ingredient) => ingredient !== null)

            setIngredientsDetails(fetchedIngredients)
          }
        }
      } catch (e) {
        console.error('Error fetching recipe or ingredients: ', e)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  return { recipe, ingredientsDetails, loading }
}
