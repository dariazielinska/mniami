import styled from '@emotion/styled'
import StarIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { useRating } from '../../hooks/useRating'

const RatingContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  font-size: 16px;
`

const Stars = styled.div`
  display: flex;
  margin-right: 8px;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const RatingValue = styled.span`
  margin-right: 4px;
`

const VotesCount = styled.span`
  color: #888;
`

function RecipeRating({ recipeId }) {
  const { averageRating, votesCount, userRating, handleRating } =
    useRating(recipeId)

  const renderStars = (rating) => {
    const stars = []

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarIcon key={i} />)
      } else if (i - rating <= 0.5) {
        stars.push(<StarHalfIcon key={i} />)
      } else {
        stars.push(<StarOutlineIcon key={i} />)
      }
    }

    return stars
  }

  return (
    <RatingContainer>
      <Stars>{renderStars(averageRating)}</Stars>
      <RatingValue>{averageRating}</RatingValue>
      <VotesCount>({votesCount})</VotesCount>

      {!userRating && (
        <Stars>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              onClick={() => handleRating(star)}
              style={{
                color: star <= userRating ? 'gold' : '#ccc',
              }}
            />
          ))}
        </Stars>
      )}
    </RatingContainer>
  )
}

export default RecipeRating
