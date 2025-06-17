import { useState, useEffect } from 'react'
import { fetchArticleById } from '../api/articlesApi'

export const useFetchArticle = (id) => {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getArticle = async () => {
      try {
        const articleData = await fetchArticleById(id)
        setArticle(articleData)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getArticle()
  }, [id])

  return { article, loading, error }
}
