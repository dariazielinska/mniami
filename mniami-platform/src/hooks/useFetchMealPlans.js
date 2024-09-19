import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { firestore } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

export const useFetchMealPlans = () => {
  const { currentUser } = useAuth()
  const [mealPlans, setMealPlans] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
          setError(e)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchMealPlans()
  }, [currentUser])

  return { mealPlans, loading, error }
}
