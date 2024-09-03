import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../firebaseConfig'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

const Container = styled.div`
  width: 100%;
`

const Title = styled.h2`
  width: 90%;
  text-align: left;
  font-weight: 600;
  font-size: 18px;
  margin: 20px auto;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`

const RecipesContainer = styled.ul`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  margin: 0 auto;
`

const RecipePreview = styled(Link)`
  width: 45%;
  heigth: 100%;
  aspect-ratio: 1;
  text-decoration: none;
  color: #333;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 30%;
  }

  @media (min-width: 1024px) {
    width: 18%;
  }
`

const Image = styled.div`
  width: 100%;
  heigth: 100%;
  aspect-ratio: 1;
  border: 1px solid #ddd;
  background-color: #ddd;
`

const RecipeTitle = styled.h3`
  text-align: left;
  font-weight: 300;
  font-size: 16px;
`

function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesCollection = collection(firestore, 'recipes')
        const recipesSnapshot = await getDocs(recipesCollection)
        const recipesList = recipesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setRecipes(recipesList)
      } catch (error) {
        console.error('Error fetching recipes: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  return (
    <div>
      <Header />
      <Container>
        <Title>Najnowsze przepisy</Title>
        {loading ? (
          <p>Ładujemy przepisy...</p>
        ) : (
          <RecipesContainer>
            {recipes.map((recipe) => (
              <RecipePreview to={`/recipe/${recipe.id}`} key={recipe.id}>
                <Image></Image>
                <RecipeTitle>{recipe.title}</RecipeTitle>
              </RecipePreview>
            ))}
          </RecipesContainer>
        )}
      </Container>
      <Footer />
    </div>
  )
}

export default Recipes
