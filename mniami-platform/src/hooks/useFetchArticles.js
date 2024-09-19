import { useState, useEffect } from 'react'
import { fetchAllArticles } from '../api/articlesApi'

export const useFetchArticles = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getArticles = async () => {
      try {
        const articlesData = await fetchAllArticles()
        setArticles(articlesData)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getArticles()
  }, [])

  return { articles, loading, error }
}
