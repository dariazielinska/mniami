import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../firebaseConfig'
import { Link } from 'react-router-dom'
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
            <Link to={`/article/${article.id}`} key={article.id}>
              {article.title}
            </Link>
          ))}
        </ul>
      )}
      <Footer />
    </div>
  )
}

export default Articles
