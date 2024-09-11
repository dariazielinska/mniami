import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useAuth } from '../contexts/AuthProvider'
import { firestore } from '../firebaseConfig'
import { collection, doc, getDoc } from 'firebase/firestore'
import { useFetchRecipes } from '../hooks/useFetchRecipes'
import Header from '../components/Header/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

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

const Image = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  background-color: #ddd;
  border: 1px solid #ddd;
`

const FavouriteTitle = styled.h3`
  text-align: center;
  font-weight: 300;
  font-size: 16px;
  padding: 10px;
`

function Favourites() {
  const { currentUser } = useAuth()
  const [favourites, setFavourites] = useState({ recipes: [], articles: [] })
  const [recipeDetails, setRecipeDetails] = useState({})
  const [articleDetails, setArticleDetails] = useState({})
  const { latestRecipes } = useFetchRecipes()

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
    <>
      <Header />
      <Title>Ulubione</Title>
      <SectionTitle>Przepisy</SectionTitle>
      {favourites.recipes.length === 0 ? (
        <p>Brak ulubionych przepisów.</p>
      ) : (
        <FavouritesContainer>
          {favourites.recipes.map((recipeId) => (
            <FavouriteItem key={recipeId} to={`/recipe/${recipeId}`}>
              <Image />
              <FavouriteTitle>
                {recipeDetails[recipeId]
                  ? recipeDetails[recipeId].title
                  : 'Ładowanie...'}
              </FavouriteTitle>
            </FavouriteItem>
          ))}
        </FavouritesContainer>
      )}
      <SectionTitle>Artykuły</SectionTitle>
      {favourites.articles.length === 0 ? (
        <p>Brak ulubionych artykułów.</p>
      ) : (
        <FavouritesContainer>
          {favourites.articles.map((articleId) => (
            <FavouriteItem key={articleId} to={`/article/${articleId}`}>
              <Image />
              <FavouriteTitle>
                {articleDetails[articleId]
                  ? articleDetails[articleId].title
                  : 'Ładowanie...'}
              </FavouriteTitle>
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
