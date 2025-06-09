import Header from '../components/Header/Header'
import SearchBar from '../components/SearchBar'
import FilterSortBar from '../components/FilterSortBar/FilterSortBar'
import ShortcutButtons from '../components/ShortcutButtons'
import Footer from '../components/Footer'
import { useFetchArticles } from '../hooks/useFetchArticles'
import { articleTopics } from '../constants/articleTopics'
import styled from '@emotion/styled'
import CallToActionButton from '../styles/CallToActionButton'
import imageMap from '../assets/imageMap'

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`

const Title = styled.h2`
  width: 100%;
  text-align: left;
  font-weight: 600;
  font-size: 18px;
  margin: 20px auto;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`

const ArticlesContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: 0 auto;

  @media (min-width: 1024px) {
    justify-content: space-between;
  }
`

const Article = styled.div`
  width: 100%;
  margin: 20px 0;

  @media (min-width: 1024px) {
    width: 45%;
  }
`

const Preview = styled.div`
  display: flex;
  flex-direction: column;
`

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;

  @media (min-width: 768px) {
    aspect-ratio: initial;
    height: 250px;
  }
`

const ArticleTitle = styled.h3`
  text-align: left;
  font-weight: 300;
  font-size: 19px;
`

const ArticleDate = styled.time`
  font-weight: 600;
  font-size: 16px;
`

const Content = styled.p`
  text-align: justify;
`

const Button = styled(CallToActionButton)`
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 220px;
  }
`

function Articles() {
  const { articles, loading, error } = useFetchArticles()

  const handleFilter = (topic) => {
    console.log(`Filtruj artykuły według tematu: ${topic}`)
  }

  if (loading) {
    return <p>Loading articles...</p>
  }

  if (error) {
    return <p>Error fetching articles: {error.message}</p>
  }

  return (
    <div>
      <Header />
      <SearchBar
        subText="Na jaki temat chcesz poczytać?"
        placeholder="najlepszy czas na rozszerzanie diety"
      />
      <FilterSortBar type="articles" />
      <ShortcutButtons
        type="articles"
        items={articleTopics}
        onFilter={handleFilter}
      />
      <Container>
        <Title>Najnowsze artykuły</Title>
        <ArticlesContainer>
          {articles.map((article) => {
            const timestamp = new Date(article.createdAt.seconds * 1000)
            const formattedDate = timestamp.toISOString()
            const localeDate = timestamp.toLocaleDateString('pl-PL')

            return (
              <Article key={article.id}>
                <Image
                  src={imageMap[article.image]}
                  alt={article.title}
                ></Image>
                <Preview>
                  <ArticleTitle>{article.title}</ArticleTitle>
                  <ArticleDate dateTime={formattedDate}>
                    {localeDate}
                  </ArticleDate>
                  <Content>{article.summary}</Content>
                  <Button to={`/article/${article.id}`}>Czytaj dalej</Button>
                </Preview>
              </Article>
            )
          })}
        </ArticlesContainer>
      </Container>
      <Footer />
    </div>
  )
}

export default Articles
