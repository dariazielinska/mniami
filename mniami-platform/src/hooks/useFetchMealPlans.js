import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { firestore } from '../firebaseConfig'
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'

export const useFetchMealPlans = () => {
  const { currentUser } = useAuth()
  const [mealPlans, setMealPlans] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMealPlans = async () => {
      if (!currentUser) return

      try {
        const userPlanRef = doc(firestore, 'mealPlans', currentUser.uid)
        const docSnap = await getDoc(userPlanRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          const meals = data.meals || []

          const groupedByDate = meals.reduce((acc, meal) => {
            const date = meal.addedAt
            if (!acc[date]) acc[date] = []
            acc[date].push(meal)
            return acc
          }, {})

          setMealPlans(groupedByDate)
        } else {
          setMealPlans({})
        }
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchMealPlans()
  }, [currentUser])

  return { mealPlans, loading, error }
}

export const removeMealFromPlan = async (userId, meal) => {
  try {
    const userDocRef = doc(firestore, 'mealPlans', userId)
    await updateDoc(userDocRef, {
      meals: arrayRemove(meal),
    })
  } catch (error) {
    console.error('Błąd przy usuwaniu przepisu z planu:', error)
    throw error
  }
}
