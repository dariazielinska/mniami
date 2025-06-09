import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { useFetchArticle } from '../hooks/useFetchArticle'
import imageMap from '../assets/imageMap'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

const ArticleImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Meta = styled.div`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 2rem;
`

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;

  p {
    margin-bottom: 1.2rem;
  }
`

const Article = () => {
  const { id } = useParams()
  const { article, loading, error } = useFetchArticle(id)

  if (loading) return <p>Loading article...</p>
  if (error) return <p>Error fetching article: {error.message}</p>

  if (!article) return <p>Article not found.</p>

  const paragraphs = article.content.split('\n').filter((p) => p.trim())

  return (
    <div>
      <Header />
      <Container>
        {article.image && imageMap[article.image] && (
          <ArticleImage src={imageMap[article.image]} alt={article.title} />
        )}
        <Title>{article.title}</Title>
        <Meta>
          {article.author && <span>Autor: {article.author}</span>}{' '}
          {article.date && (
            <span>• {new Date(article.date).toLocaleDateString()}</span>
          )}
        </Meta>

        <Content>
          {paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </Content>
      </Container>
      <Footer />
    </div>
  )
}

export default Article
