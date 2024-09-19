import { useAuth } from '../contexts/AuthProvider'
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { firestore } from '../firebaseConfig'

export const useShoppingList = () => {
  const { currentUser } = useAuth()

  const getShoppingList = async () => {
    if (!currentUser) return null

    const shoppingListRef = doc(firestore, 'shoppingLists', currentUser.uid)
    const docSnap = await getDoc(shoppingListRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return { items: [] }
    }
  }

  const addToShoppingList = async (ingredients, ingredientsDetails) => {
    if (!currentUser) {
      console.log('User is not logged in')
      return
    }

    const formattedIngredients = ingredients
      .map((ingredient) => {
        const ingredientDetail = ingredientsDetails.find(
          (detail) => detail.id === ingredient.id
        )
        return ingredientDetail
          ? {
              id: ingredient.id,
              name: ingredientDetail.name,
              quantity: ingredient.quantity,
              unit: ingredientDetail.unit,
              purchased: false,
            }
          : null
      })
      .filter(Boolean)

    const shoppingListRef = doc(firestore, 'shoppingLists', currentUser.uid)

    try {
      await updateDoc(shoppingListRef, {
        items: arrayUnion(...formattedIngredients),
      })
      console.log('Ingredients added to shopping list')
    } catch (error) {
      console.error('Error adding ingredients to shopping list: ', error)
    }
  }

  return { getShoppingList, addToShoppingList }
}
