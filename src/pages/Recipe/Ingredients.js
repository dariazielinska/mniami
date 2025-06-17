import styled from '@emotion/styled'
import { useShoppingList } from '../../hooks/useShoppingList'
import { useState } from 'react'

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
  const { addToShoppingList } = useShoppingList()
  const [loading, setLoading] = useState(false)

  const handleAddToShoppingList = async () => {
    setLoading(true)
    await addToShoppingList(ingredients, ingredientsDetails)
    setLoading(false)
  }

  if (!ingredients || ingredients.length === 0) {
    return <p>Brak składników do wyświetlenia</p>
  }

  return (
    <IngredientsContainer>
      <IngredientsTitle>Składniki</IngredientsTitle>
      <IngredientsList>
        {ingredients.map((ingredient) => {
          const ingredientDetail = ingredientsDetails.find(
            (detail) => detail.id === ingredient.id
          )
          return (
            <IngredientItem key={ingredient.id}>
              {ingredient.quantity}
              {ingredientDetail ? ` ${ingredientDetail.unit} ` : ' '}
              {ingredientDetail ? ingredientDetail.name : 'Ładowanie...'}
            </IngredientItem>
          )
        })}
      </IngredientsList>
      <AddToCartButton onClick={handleAddToShoppingList} disabled={loading}>
        {loading ? 'Dodawanie...' : 'Dodaj do listy zakupów'}
      </AddToCartButton>
    </IngredientsContainer>
  )
}

export default Ingredients
