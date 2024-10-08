import Header from '../components/Header/Header'
import SearchBar from '../components/SearchBar'
import FilterSortBar from '../components/FilterSortBar/FilterSortBar'
import ShortcutButtons from '../components/ShortcutButtons'
import Footer from '../components/Footer'
import { useFetchArticles } from '../hooks/useFetchArticles'
import { articleTopics } from '../constants/articleTopics'
import styled from '@emotion/styled'
import CallToActionButton from '../styles/CallToActionButton'

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

const Image = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid #ddd;
  background-color: #ddd;

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

const Date = styled.time`
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
          {articles.map((article) => (
            <Article key={article.id}>
              <Image></Image>
              <Preview>
                <ArticleTitle>{article.title}</ArticleTitle>
                <Date datetime="2024-09-02">20.08.2024</Date>
                <Content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </Content>
                <Button to={`/article/${article.id}`}>Czytaj dalej</Button>
              </Preview>
            </Article>
          ))}
        </ArticlesContainer>
      </Container>
      <Footer />
    </div>
  )
}

export default Articles
