import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import Header from '../components/Header/Header'
import SearchBar from '../components/SearchBar'
import FilterSortBar from '../components/FilterSortBar/FilterSortBar'
import ShortcutButtons from '../components/ShortcutButtons'
import Footer from '../components/Footer'
import { recipeCategories } from '../constants/recipeCategories'
import { useFetchRecipes } from '../hooks/useFetchRecipes'

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
  height: 100%;
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
  height: 100%;
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
  const { recipes, loading, error } = useFetchRecipes()

  const handleFilter = (category) => {
    console.log(`Filtruj przepisy według kategorii: ${category}`)
  }

  if (loading) {
    return <p>Ładujemy przepisy...</p>
  }

  if (error) {
    return <p>Błąd podczas ładowania przepisów: {error.message}</p>
  }

  return (
    <div>
      <Header />
      <SearchBar
        subText="Jakie posiłki dzisiaj zaplanujesz?"
        placeholder="placuszki bananowe w 3 minuty"
      />
      <FilterSortBar type="recipes" />
      <ShortcutButtons
        type="recipes"
        items={recipeCategories}
        onFilter={handleFilter}
      />
      <Container>
        <Title>Najnowsze przepisy</Title>
        <RecipesContainer>
          {recipes.map((recipe) => (
            <RecipePreview to={`/recipe/${recipe.id}`} key={recipe.id}>
              <Image />
              <RecipeTitle>{recipe.title}</RecipeTitle>
            </RecipePreview>
          ))}
        </RecipesContainer>
      </Container>
      <Footer />
    </div>
  )
}

export default Recipes
