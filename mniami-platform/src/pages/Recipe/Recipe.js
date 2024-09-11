import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import styled from '@emotion/styled'
import RecipeRating from './RecipeRating'
import Ingredients from './Ingredients'
import Instructions from './Instructions'
import Carousel from '../../components/Carousel'
import Footer from '../../components/Footer'
import Header from '../../components/Header/Header'
import RecipeImage from './RecipeImage'
import { useFetchRecipes } from '../../hooks/useFetchRecipes'

const RecipeContainer = styled.div``

const Title = styled.h1`
  width: 90%;
  margin: 20px auto 9px auto;
  font-size: 24px;
  font-weight: 500;
`

function Recipe() {
  const { latestRecipes } = useFetchRecipes()
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
      {recipe ? (
        <RecipeContainer>
          <RecipeImage recipeId={id} />
          <Title>{recipe.title}</Title>
          <RecipeRating recipeId={id} />
          <Ingredients ingredients={recipe.ingredients} />
          <Instructions instructions={recipe.instructions} />
          <Carousel
            type={'Zobacz inne przepisy'}
            items={latestRecipes}
            category="recipe"
            viewAllLink="/recipes"
          />
        </RecipeContainer>
      ) : (
        <p>Recipe not found.</p>
      )}
      <Footer />
    </div>
  )
}

export default Recipe
