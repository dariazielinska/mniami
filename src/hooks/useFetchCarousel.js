import { useState, useEffect } from 'react'
import {
  fetchLatestRecipes,
  fetchBestRecipes,
  fetchLatestArticles,
} from '../api/carouselApi'

export const useFetchCarousel = () => {
  const [latestRecipes, setLatestRecipes] = useState([])
  const [bestRecipes, setBestRecipes] = useState([])
  const [latestArticles, setlatestArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const [latestRecipes, bestRecipes, latestArticles] = await Promise.all([
          fetchLatestRecipes(),
          fetchBestRecipes(),
          fetchLatestArticles(),
        ])
        setLatestRecipes(latestRecipes)
        setBestRecipes(bestRecipes)
        setlatestArticles(latestArticles)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  return { latestRecipes, bestRecipes, latestArticles, loading, error }
}
