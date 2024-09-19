import { useParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { useFetchArticle } from '../hooks/useFetchArticle'

const Article = () => {
  const { id } = useParams()
  const { article, loading, error } = useFetchArticle(id)

  if (loading) {
    return <p>Loading article...</p>
  }

  if (error) {
    return <p>Error fetching article: {error.message}</p>
  }

  return (
    <div>
      <Header />
      ZAKŁADKA ARTYKUŁ
      <div>
        {article ? (
          <div>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
          </div>
        ) : (
          <p>Article not found.</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Article
