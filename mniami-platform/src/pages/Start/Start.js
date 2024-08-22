import Header from '../../components/Header/Header'
import HeroSection from './HeroSection'
import Carousel from '../../components/Carousel'
import Footer from '../../components/Footer'
import { useState, useEffect } from 'react'
import {
  fetchLatestRecipes,
  fetchBestRecipes,
  fetchLatestArticles,
} from '../../api/api'

function Start() {
  const [latestRecipes, setLatestRecipes] = useState([])
  const [bestRecipes, setbestRecipes] = useState([])
  const [latestArticles, setLatestArticles] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const [latestRecipesData, bestRecipesData, latestArticlesData] =
          await Promise.all([
            fetchLatestRecipes(),
            fetchBestRecipes(),
            fetchLatestArticles(),
          ])

        setLatestRecipes(latestRecipesData)
        setbestRecipes(bestRecipesData)
        setLatestArticles(latestArticlesData)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    getData()
  }, [])

  return (
    <div>
      <Header />
      <HeroSection />
      <Carousel items={latestRecipes} viewAllLink="/recipes" />
      <Carousel items={bestRecipes} viewAllLink="/recipes" />
      <Carousel items={latestArticles} viewAllLink="/articles" />
      <Footer />
    </div>
  )
}

export default Start
