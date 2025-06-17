import styled from '@emotion/styled'
import { useState } from 'react'
import { useMealPlan } from '../../hooks/useMealPlan'

const Button = styled.button`
  padding: 7px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;
  border-radius: 10px;
  color: #333;
  text-align: center;
  cursor: pointer;
  margin: 0 75px;
  width: 90%;
  display: block;

  @media (min-width: 768px) {
    width: 45%;
  }

  @media (min-width: 1024px) {
    width: 27%;
  }
`

const AddToPlanButton = ({ recipe, recipeId }) => {
  const [loading, setLoading] = useState(false)
  const { addToPlan } = useMealPlan()

  const handleAddToPlan = async () => {
    if (!recipe) return
    setLoading(true)
    await addToPlan(recipe, recipeId)
    setLoading(false)
  }

  return (
    <Button onClick={handleAddToPlan} disabled={loading}>
      {loading ? 'Dodawanie...' : 'Dodaj do planu'}
    </Button>
  )
}

export default AddToPlanButton
