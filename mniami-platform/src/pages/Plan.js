import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { useFetchMealPlans } from '../hooks/useFetchMealPlans'
import { useFetchRecipesList } from '../hooks/useFetchRecipesList'

function Plan() {
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
    return <p>Loading plans and recipes...</p>
  }

  if (mealPlansError) {
    return <p>Error fetching meal plans: {mealPlansError.message}</p>
  }

  if (recipesError) {
    return <p>Error fetching recipes: {recipesError.message}</p>
  }

  return (
    <div>
      <Header />
      ZAKŁADKA PLANY
      <div>
        {Object.entries(mealPlans).length === 0 ? (
          <p>No meal plans available.</p>
        ) : (
          Object.entries(mealPlans).map(([date, recipesArray]) => (
            <div key={date}>
              <h2>{new Date(date).toLocaleDateString()}</h2>
              <ul>
                {recipesArray.map((recipeId) => (
                  <li key={recipeId}>{recipes[recipeId] || 'Loading...'}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Plan
