import { useState } from 'react'
import styled from '@emotion/styled'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { useFetchMealPlans } from '../hooks/useFetchMealPlans'
import { useFetchRecipesList } from '../hooks/useFetchRecipesList'

// Komponenty stylizowane
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

const ViewSwitcher = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`

const ViewButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? '#4CAF50' : '#e0e0e0')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#45a049' : '#d0d0d0')};
  }
`

const DayPlan = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`

const DayHeader = styled.h2`
  color: #333;
  margin-top: 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`

const MealList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const MealItem = styled.li`
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
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

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.2rem;
`

const DayContainer = styled.div`
  margin-bottom: 1rem;
`

const DayTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #555;
`

const DetailsButton = styled.button`
  background: #f0f0f0;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
`

const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

const groupByWeek = (mealPlans) => {
  const weeks = {}

  Object.entries(mealPlans).forEach(([date, recipes]) => {
    const jsDate = new Date(date)
    const weekNumber = getWeekNumber(jsDate)
    const year = jsDate.getFullYear()
    const weekKey = `${year}-W${weekNumber.toString().padStart(2, '0')}`

    if (!weeks[weekKey]) {
      weeks[weekKey] = {}
    }

    weeks[weekKey][date] = recipes
  })

  return weeks
}

const groupByMonth = (mealPlans) => {
  const months = {}

  Object.entries(mealPlans).forEach(([date, recipes]) => {
    const jsDate = new Date(date)
    const month = jsDate.getMonth() + 1
    const year = jsDate.getFullYear()
    const monthKey = `${year}-${month.toString().padStart(2, '0')}`

    if (!months[monthKey]) {
      months[monthKey] = {}
    }

    months[monthKey][date] = recipes
  })

  return months
}

function Plan() {
  const [viewMode, setViewMode] = useState('day')

  const {
    mealPlans,
    loading: mealPlansLoading,
    error: mealPlansError,
  } = useFetchMealPlans()

  const {
    recipes,
    loading: recipesLoading,
    error: recipesError,
  } = useFetchRecipesList()

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

  if (mealPlansError) {
    return (
      <Container>
        <Header />
        <Content>
          <ErrorMessage>
            Błąd podczas pobierania planów posiłków: {mealPlansError.message}
          </ErrorMessage>
        </Content>
        <Footer />
      </Container>
    )
  }

  if (recipesError) {
    return (
      <Container>
        <Header />
        <Content>
          <ErrorMessage>
            Błąd podczas pobierania przepisów: {recipesError.message}
          </ErrorMessage>
        </Content>
        <Footer />
      </Container>
    )
  }

  const renderDayView = () => (
    <>
      {Object.entries(mealPlans).length === 0 ? (
        <EmptyMessage>Brak dostępnych planów posiłków.</EmptyMessage>
      ) : (
        Object.entries(mealPlans)
          .sort(
            ([dateA], [dateB]) =>
              new Date(dateA).getTime() - new Date(dateB).getTime()
          )
          .map(([date, recipesArray]) => (
            <DayPlan key={date}>
              <DayHeader>
                {new Date(date).toLocaleDateString('pl-PL', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </DayHeader>
              <MealList>
                {recipesArray.map((recipeId) => (
                  <MealItem key={recipeId}>
                    <span>{recipes[recipeId] || 'Ładowanie...'}</span>
                    <DetailsButton>Szczegóły</DetailsButton>
                  </MealItem>
                ))}
              </MealList>
            </DayPlan>
          ))
      )}
    </>
  )

  const renderWeekView = () => {
    const weeks = groupByWeek(mealPlans)

    return (
      <>
        {Object.keys(weeks).length === 0 ? (
          <EmptyMessage>Brak dostępnych planów posiłków.</EmptyMessage>
        ) : (
          Object.entries(weeks)
            .sort(([weekA], [weekB]) => weekA.localeCompare(weekB))
            .map(([weekKey, days]) => {
              const [year, week] = weekKey.split('-W')
              return (
                <DayPlan key={weekKey}>
                  <DayHeader>
                    Tydzień {week}, {year}
                  </DayHeader>
                  {Object.entries(days)
                    .sort(
                      ([dateA], [dateB]) =>
                        new Date(dateA).getTime() - new Date(dateB).getTime()
                    )
                    .map(([date, recipesArray]) => (
                      <DayContainer key={date}>
                        <DayTitle>
                          {new Date(date).toLocaleDateString('pl-PL', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                          })}
                        </DayTitle>
                        <MealList>
                          {recipesArray.map((recipeId) => (
                            <MealItem key={recipeId}>
                              <span>{recipes[recipeId] || 'Ładowanie...'}</span>
                              <DetailsButton>Szczegóły</DetailsButton>
                            </MealItem>
                          ))}
                        </MealList>
                      </DayContainer>
                    ))}
                </DayPlan>
              )
            })
        )}
      </>
    )
  }

  const renderMonthView = () => {
    const months = groupByMonth(mealPlans)

    return (
      <>
        {Object.keys(months).length === 0 ? (
          <EmptyMessage>Brak dostępnych planów posiłków.</EmptyMessage>
        ) : (
          Object.entries(months)
            .sort(([monthA], [monthB]) => monthA.localeCompare(monthB))
            .map(([monthKey, days]) => {
              const [year, month] = monthKey.split('-')
              const monthName = new Date(
                parseInt(year),
                parseInt(month) - 1,
                1
              ).toLocaleDateString('pl-PL', { month: 'long' })

              return (
                <DayPlan key={monthKey}>
                  <DayHeader>
                    {monthName}
                    {year}
                  </DayHeader>
                  {Object.entries(days)
                    .sort(
                      ([dateA], [dateB]) =>
                        new Date(dateA).getTime() - new Date(dateB).getTime()
                    )
                    .map(([date, recipesArray]) => (
                      <DayContainer key={date}>
                        <DayTitle>
                          {new Date(date).toLocaleDateString('pl-PL', {
                            weekday: 'short',
                            day: 'numeric',
                          })}
                        </DayTitle>
                        <MealList>
                          {recipesArray.map((recipeId) => (
                            <MealItem key={recipeId}>
                              <span>{recipes[recipeId] || 'Ładowanie...'}</span>
                              <DetailsButton>Szczegóły</DetailsButton>
                            </MealItem>
                          ))}
                        </MealList>
                      </DayContainer>
                    ))}
                </DayPlan>
              )
            })
        )}
      </>
    )
  }

  return (
    <Container>
      <Header />
      <Content>
        <ViewSwitcher>
          <ViewButton
            active={viewMode === 'day'}
            onClick={() => setViewMode('day')}
          >
            Widok dzienny
          </ViewButton>
          <ViewButton
            active={viewMode === 'week'}
            onClick={() => setViewMode('week')}
          >
            Widok tygodniowy
          </ViewButton>
          <ViewButton
            active={viewMode === 'month'}
            onClick={() => setViewMode('month')}
          >
            Widok miesięczny
          </ViewButton>
        </ViewSwitcher>

        {viewMode === 'day' && renderDayView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'month' && renderMonthView()}
      </Content>
      <Footer />
    </Container>
  )
}

export default Plan
