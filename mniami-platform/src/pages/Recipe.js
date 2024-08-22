import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

function Recipe() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = doc(firestore, 'recipes', id)
        const recipeSnap = await getDoc(recipeRef)

        if (recipeSnap.exists()) {
          setRecipe(recipeSnap.data())
        }
      } catch (e) {
        console.error('Error fetching recipe: ', e)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  if (loading) {
    return <p>Loading recipe...</p>
  }

  return (
    <div>
      <Header />
      ZAKŁADKA PRZEPIS SZCZEGÓŁY
      <div>
        {recipe ? (
          <div>
            <h1>{recipe.title}</h1>
          </div>
        ) : (
          <p>recipe not found.</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Recipe
