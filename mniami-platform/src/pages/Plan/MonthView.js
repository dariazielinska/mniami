import EmptyMessage from './EmptyMessage'
import PlanRecipe from './PlanRecipe'

function MonthView({ mealPlans, setMealPlans }) {
  if (Object.entries(mealPlans).length === 0) {
    return <EmptyMessage>Brak dostępnych planów posiłków.</EmptyMessage>
  }

  return (
    <>
      {Object.entries(mealPlans)
        .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
        .map(([date, recipesArray]) => {
          const formattedDate = new Date(date).toLocaleDateString('pl-PL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })

          return (
            <div
              key={date}
              style={{
                background: '#fff',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h2
                style={{
                  borderBottom: '1px solid #eee',
                  paddingBottom: '0.5rem',
                  marginTop: 0,
                  color: '#333',
                }}
              >
                {formattedDate}
              </h2>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {recipesArray.map((recipe) => (
                  <PlanRecipe
                    key={recipe.id}
                    recipe={recipe}
                    date={date}
                    setMealPlans={setMealPlans}
                  />
                ))}
              </div>
            </div>
          )
        })}
    </>
  )
}

export default MonthView
