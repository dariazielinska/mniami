import styled from '@emotion/styled'
import { useAuth } from '../../contexts/AuthProvider'
import { removeMealFromPlan } from '../../hooks/useFetchMealPlans'
import { useState } from 'react'
import imageMap from '../../assets/imageMap'

const RecipeCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
  gap: 1rem;
`

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  object-fit: cover;
  background-color: #e0e0e0;
`

const Title = styled.span`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`

const RemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #d32f2f;
  }
`

function PlanRecipe({ recipe, date, setMealPlans }) {
  const { currentUser } = useAuth()
  const [removing, setRemoving] = useState(false)

  const handleRemove = async () => {
    if (!currentUser) return

    setRemoving(true)
    try {
      await removeMealFromPlan(currentUser.uid, recipe)

      setMealPlans((prev) => {
        const updated = { ...prev }
        const filteredRecipes = updated[date].filter((r) => r.id !== recipe.id)
        if (filteredRecipes.length > 0) {
          updated[date] = filteredRecipes
        } else {
          delete updated[date]
        }
        return updated
      })
    } catch (error) {
      console.error('Błąd przy usuwaniu przepisu:', error)
    } finally {
      setRemoving(false)
    }
  }

  return (
    <RecipeCard>
      <InfoContainer>
        <Thumbnail src={imageMap[recipe.image]} alt={recipe.title} />
        <Title>{recipe.title}</Title>
      </InfoContainer>
      <RemoveButton onClick={handleRemove} disabled={removing}>
        {removing ? 'Usuwanie...' : 'Usuń'}
      </RemoveButton>
    </RecipeCard>
  )
}

export default PlanRecipe
