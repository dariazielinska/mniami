import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { firestore } from '../firebaseConfig'
import { collection, query, getDocs } from 'firebase/firestore'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

function Plan() {
  const { currentUser } = useAuth()
  const [mealPlans, setMealPlans] = useState({})
  const [recipes, setRecipes] = useState({})

  useEffect(() => {
    const fetchMealPlans = async () => {
      if (currentUser) {
        try {
          const mealPlansRef = collection(
            firestore,
            'mealPlans',
            currentUser.uid,
            'plans'
          )
          const mealPlansSnapshot = await getDocs(mealPlansRef)

          let plans = {}
          mealPlansSnapshot.forEach((doc) => {
            plans[doc.id] = doc.data().recipes
          })
          setMealPlans(plans)
        } catch (e) {
          console.error('Error fetching meal plans:', e)
        }
      }
    }

    const fetchRecipes = async () => {
      try {
        const q = query(collection(firestore, 'recipes'))
        const querySnapshot = await getDocs(q)

        let allRecipes = {}
        querySnapshot.forEach((doc) => {
          allRecipes[doc.id] = doc.data().title
        })

        setRecipes(allRecipes)
      } catch (e) {
        console.error('Error fetching recipes:', e)
      }
    }

    fetchMealPlans()
    fetchRecipes()
  }, [currentUser])

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
