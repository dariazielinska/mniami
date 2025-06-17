import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import { useFetchMealPlans } from '../../hooks/useFetchMealPlans'
import { useFetchRecipesList } from '../../hooks/useFetchRecipesList'
import ViewSwitcher from './ViewSwitcher'
import DayView from './DayView'
import WeekView from './WeekView'
import MonthView from './MonthView'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
`

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`

const LoadingMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.2rem;
`

const ErrorMessage = styled.p`
  text-align: center;
  color: #d32f2f;
  font-size: 1.2rem;
`

function Plan() {
  const [viewMode, setViewMode] = useState('day')

  const {
    mealPlans: fetchedMealPlans,
    loading: mealPlansLoading,
    error: mealPlansError,
  } = useFetchMealPlans()

  const { loading: recipesLoading, error: recipesError } = useFetchRecipesList()
  const [mealPlans, setMealPlans] = useState({})

  useEffect(() => {
    if (fetchedMealPlans) {
      setMealPlans(fetchedMealPlans)
    }
  }, [fetchedMealPlans])

  if (mealPlansLoading || recipesLoading) {
    return (
      <Container>
        <Header />
        <Content>
          <LoadingMessage>Ładowanie planów i przepisów...</LoadingMessage>
        </Content>
        <Footer />
      </Container>
    )
  }

  if (mealPlansError || recipesError) {
    return (
      <Container>
        <Header />
        <Content>
          <ErrorMessage>
            {mealPlansError?.message || recipesError?.message}
          </ErrorMessage>
        </Content>
        <Footer />
      </Container>
    )
  }

  return (
    <Container>
      <Header />
      <Content>
        <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
        {viewMode === 'day' && (
          <DayView mealPlans={mealPlans} setMealPlans={setMealPlans} />
        )}
        {viewMode === 'week' && (
          <WeekView mealPlans={mealPlans} setMealPlans={setMealPlans} />
        )}
        {viewMode === 'month' && (
          <MonthView mealPlans={mealPlans} setMealPlans={setMealPlans} />
        )}
      </Content>
      <Footer />
    </Container>
  )
}

export default Plan
