import Header from '../components/Header/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import { useFetchFavourites } from '../hooks/useFetchFavourites'
import { useFetchCarousel } from '../hooks/useFetchCarousel'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import imageMap from '../assets/imageMap'

const Title = styled.h1`
  width: 90%;
  margin: 20px auto 9px auto;
  font-size: 24px;
  font-weight: 500;
`

const SectionTitle = styled.h2`
  font-size: 20px;
  margin: 15px auto;
  width: 90%;
  font-weight: 500;
`

const FavouritesContainer = styled.ul`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 16px;
  padding: 0;
  margin: 0 auto;
`

const FavouriteItem = styled(Link)`
  text-decoration: none;
  color: #333;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background-color: #eee;
`

const FavouriteTitle = styled.h3`
  text-align: center;
  font-weight: 300;
  font-size: 16px;
  padding: 10px;
`

function Favourites() {
  const {
    favourites,
    recipeDetails,
    articleDetails,
    loading: favouritesLoading,
    error,
  } = useFetchFavourites()
  const { latestRecipes, loading: recipesLoading } = useFetchCarousel()

  if (favouritesLoading || recipesLoading) {
    return <p>Loading favourites and recipes...</p>
  }

  if (error) {
    return <p>Error fetching favourites: {error.message}</p>
  }

  return (
    <>
      <Header />
      <Title>Ulubione</Title>
      <SectionTitle>Przepisy</SectionTitle>
      {favourites.recipes.length === 0 ? (
        <p>Brak ulubionych przepisów.</p>
      ) : (
        <FavouritesContainer>
          {favourites.recipes
            .map((recipeId) => recipeDetails[recipeId])
            .filter(Boolean)
            .map((recipe) => (
              <FavouriteItem key={recipe.id} to={`/recipe/${recipe.id}`}>
                <Image src={imageMap[recipe.image]} alt={recipe.title} />
                <FavouriteTitle>{recipe.title}</FavouriteTitle>
              </FavouriteItem>
            ))}
        </FavouritesContainer>
      )}
      <SectionTitle>Artykuły</SectionTitle>
      {favourites.articles.length === 0 ? (
        <p>Brak ulubionych artykułów.</p>
      ) : (
        <FavouritesContainer>
          {favourites.articles
            .map((articleId) => articleDetails[articleId])
            .filter(Boolean)
            .map((article) => (
              <FavouriteItem key={article.id} to={`/article/${article.id}`}>
                <Image src={imageMap[article.image]} alt={article.title} />
                <FavouriteTitle>{article.title}</FavouriteTitle>
              </FavouriteItem>
            ))}
        </FavouritesContainer>
      )}
      <Carousel
        type={'Przeglądaj nasze najnowsze przepisy'}
        items={latestRecipes}
        category="recipe"
        viewAllLink="/recipes"
      />
      <Footer />
    </>
  )
}

export default Favourites
