import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import Header from '../components/Header/Header'
import SearchBar from '../components/SearchBar'
import FilterSortBar from '../components/FilterSortBar/FilterSortBar'
import ShortcutButtons from '../components/ShortcutButtons'
import Footer from '../components/Footer'
import { recipeCategories } from '../constants/recipeCategories'
import { useFetchRecipes } from '../hooks/useFetchRecipes'
import imageMap from '../assets/imageMap'

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
  margin: 0 auto;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.2rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 2rem;
  }
`

const RecipePreview = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #333;
  background-color: #fafafa;
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background-color: #eee;
`

const RecipeTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.75rem 0.75rem 1rem;
  margin: 0;
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
              <Image src={imageMap[recipe.image]} alt={recipe.title} />
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
