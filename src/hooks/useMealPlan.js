import { useAuth } from '../contexts/AuthProvider'
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore'
import { firestore } from '../firebaseConfig'

export const useMealPlan = () => {
  const { currentUser } = useAuth()

  const getMealPlan = async () => {
    if (!currentUser) return null

    const mealPlanRef = doc(firestore, 'mealPlans', currentUser.uid)
    const docSnap = await getDoc(mealPlanRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return { meals: [] }
    }
  }

  const addToPlan = async (recipe, id) => {
    if (!currentUser) {
      console.log('User is not logged in')
      return
    }

    const mealPlanRef = doc(firestore, 'mealPlans', currentUser.uid)

    const formattedRecipe = {
      id: id,
      title: recipe.title,
      image: recipe.image || '',
      addedAt: new Date().toISOString(),
    }

    console.log(formattedRecipe)

    try {
      const docSnap = await getDoc(mealPlanRef)
      if (!docSnap.exists()) {
        await setDoc(mealPlanRef, { meals: [] })
      }

      await updateDoc(mealPlanRef, {
        meals: arrayUnion(formattedRecipe),
      })

      console.log('Recipe added to meal plan')
    } catch (error) {
      console.error('Error adding recipe to meal plan: ', error)
    }
  }

  return { getMealPlan, addToPlan }
}
