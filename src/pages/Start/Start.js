import Header from '../../components/Header/Header'
import HeroSection from './HeroSection'
import Carousel from '../../components/Carousel'
import VideoSection from './VideoSection'
import GetTheAppSection from './GetTheAppSection'
import WhoWeAreSection from './WhoWeAreSection'
import Newsletter from './Newsletter'
import Footer from '../../components/Footer'
import { useFetchCarousel } from '../../hooks/useFetchCarousel'

function Start() {
  const { latestRecipes, bestRecipes, latestArticles, loading, error } =
    useFetchCarousel()
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading recipes.</p>

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
