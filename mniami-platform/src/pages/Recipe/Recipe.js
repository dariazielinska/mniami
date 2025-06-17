import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import RecipeRating from './RecipeRating'
import Ingredients from './Ingredients'
import AddToPlanButton from './AddToPlanButton'
import Instructions from './Instructions'
import Carousel from '../../components/Carousel'
import Footer from '../../components/Footer'
import Header from '../../components/Header/Header'
import RecipeImage from './RecipeImage'
import { useFetchCarousel } from '../../hooks/useFetchCarousel'
import { useRecipe } from '../../hooks/useRecipe'

const RecipeContainer = styled.div``

const Title = styled.h1`
  width: 90%;
  margin: 20px auto 9px auto;
  font-size: 24px;
  font-weight: 500;
`

function Recipe() {
  const { id } = useParams()
  const { latestRecipes } = useFetchCarousel()
  const { recipe, ingredientsDetails, loading } = useRecipe(id)

  if (loading) {
    return <p>Loading recipe...</p>
  }

  return (
    <div>
      <Header />
      {recipe ? (
        <RecipeContainer>
          <RecipeImage image={recipe.image} recipeId={id} />
          <Title>{recipe.title}</Title>
          <RecipeRating recipeId={id} />
          <Ingredients
            ingredients={recipe.ingredients}
            ingredientsDetails={ingredientsDetails}
          />
          <AddToPlanButton recipe={recipe} recipeId={id} />
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
