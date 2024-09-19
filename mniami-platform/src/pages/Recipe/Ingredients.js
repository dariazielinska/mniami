import styled from '@emotion/styled'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { firestore } from '../../firebaseConfig'
import { useAuth } from '../../contexts/AuthProvider'

const IngredientsContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`

const IngredientsTitle = styled.h2`
  margin: 20px 0 9px 0;
  font-size: 20px;
  font-weight: 500;
`

const IngredientsList = styled.ul`
  font-size: 18px;
  padding-inline-start: 20px;
`

const IngredientItem = styled.li``

const AddToCartButton = styled.button`
  padding: 7px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;
  border-radius: 10px;
  text-decoration: none;
  color: #333;
  text-align: center;
  cursor: pointer;
  margin: 15px 0;
  width: 100%;
  display: block;

  @media (min-width: 768px) {
    width: 45%;
  }

  @media (min-width: 1024px) {
    width: 30%;
  }
`

const Ingredients = ({ ingredients, ingredientsDetails }) => {
  const { currentUser } = useAuth()

  const addToShoppingList = async () => {
    if (!currentUser) {
      console.log('User is not logged in')
      return
    }

    const shoppingListRef = doc(firestore, 'shoppingLists', currentUser.uid)

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

    try {
      await updateDoc(shoppingListRef, {
        items: arrayUnion(...formattedIngredients),
      })
      console.log('Ingredients added to shopping list')
    } catch (error) {
      console.error('Error adding ingredients to shopping list: ', error)
    }
  }

  const handleAddToShoppingList = () => {
    addToShoppingList()
  }

  if (!ingredients || ingredients.length === 0) {
    return <p>Wystąpił błąd</p>
  }

  return (
    <IngredientsContainer>
      <IngredientsTitle>Składniki</IngredientsTitle>
      <IngredientsList>
        {ingredients.map((ingredient, index) => {
          const ingredientDetail = ingredientsDetails.find(
            (detail) => detail.id === ingredient.id
          )
          return (
            <IngredientItem key={index}>
              {ingredient.quantity}
              {ingredientDetail.unit}{' '}
              {ingredientDetail ? ingredientDetail.name : 'Ładowanie...'}
            </IngredientItem>
          )
        })}
      </IngredientsList>
      <AddToCartButton onClick={handleAddToShoppingList}>
        Dodaj do listy zakupów
      </AddToCartButton>
    </IngredientsContainer>
  )
}

export default Ingredients
