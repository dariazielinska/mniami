import styled from '@emotion/styled'

const IngredientsContainer = styled.div``

const IngredientsTitle = styled.h2`
  width: 90%;
  margin: 20px auto 9px auto;
  font-size: 22px;
  font-weight: 500;
`

const IngredientsList = styled.ul`
  width: 90%;
  margin: 0 auto;
  font-size: 20px;
`

const IngredientItem = styled.li``

const Ingredients = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) {
    return <p>Wystąpił błąd</p>
  }

  return (
    <IngredientsContainer>
      <IngredientsTitle>Składniki</IngredientsTitle>
      <IngredientsList>
        {ingredients.map((ingredient, index) => (
          <IngredientItem key={index}>
            {ingredient.quantity} {ingredient.unit} {ingredient.name}
          </IngredientItem>
        ))}
      </IngredientsList>
    </IngredientsContainer>
  )
}

export default Ingredients
