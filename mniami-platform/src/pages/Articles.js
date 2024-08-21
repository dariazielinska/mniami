import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../firebaseConfig'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesCollection = collection(firestore, 'articles')
        const articlesSnapshot = await getDocs(articlesCollection)
        const articlesList = articlesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setArticles(articlesList)
      } catch (error) {
        console.error('Error fetching articles: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div>
      <Header />
      ZAKŁADKA ARTYKUŁY
      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      )}
      <Footer />
    </div>
  )
}

export default Articles
