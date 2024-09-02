import Header from '../../components/Header/Header'
import HeroSection from './HeroSection'
import Carousel from '../../components/Carousel'
import VideoSection from './VideoSection'
import GetTheAppSection from './GetTheAppSection'
import WhoWeAreSection from './WhoWeAreSection'
import Newsletter from './Newsletter'
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
      <Carousel
        type={'Najnowsze przepisy'}
        items={latestRecipes}
        category="recipe"
        viewAllLink="/recipes"
      />
      <VideoSection />
      <Carousel
        type={'Wasze ulubione'}
        items={bestRecipes}
        category="recipe"
        viewAllLink="/recipes"
      />
      <GetTheAppSection />
      <Carousel
        type={'Ostatnie artykuły'}
        items={latestArticles}
        category="article"
        viewAllLink="/articles"
      />
      <WhoWeAreSection />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Start
