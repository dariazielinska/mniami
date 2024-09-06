import { useEffect, useState } from 'react'
import { firestore } from '../firebaseConfig'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import styled from '@emotion/styled'
import StarIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { useAuth } from '../contexts/AuthProvider'

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

const getAverageRating = async (recipeId, userId) => {
  const ratingsRef = collection(firestore, 'ratings')
  const q = query(ratingsRef, where('recipeId', '==', recipeId))
  const querySnapshot = await getDocs(q)

  let totalRating = 0
  let count = 0
  let userHasVoted = false
  let userRating = null

  querySnapshot.forEach((doc) => {
    const data = doc.data()
    totalRating += data.rating
    count += 1

    if (data.userId === userId) {
      userHasVoted = true
      userRating = data.rating
    }
  })

  const averageRating = count > 0 ? (totalRating / count).toFixed(2) : 0

  return {
    averageRating: parseFloat(averageRating),
    count,
    userHasVoted,
    userRating,
  }
}

function RecipeRating({ recipeId }) {
  const [averageRating, setAverageRating] = useState(0)
  const [votesCount, setVotesCount] = useState(0)
  const [userRating, setUserRating] = useState(null)
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchRatings = async () => {
      const { averageRating, count, userRating } = await getAverageRating(
        recipeId,
        currentUser?.uid
      )
      setAverageRating(averageRating)
      setVotesCount(count)
      setUserRating(userRating)
    }

    fetchRatings()
  }, [recipeId, currentUser])

  const handleRating = async (rating) => {
    if (currentUser) {
      if (userRating === null) {
        try {
          const ratingsRef = collection(firestore, 'ratings')
          await addDoc(ratingsRef, {
            recipeId: recipeId,
            userId: currentUser.uid,
            rating: rating,
          })

          const { averageRating, count } = await getAverageRating(
            recipeId,
            currentUser.uid
          )
          setAverageRating(averageRating)
          setVotesCount(count)
          setUserRating(rating)
        } catch (error) {
          console.error('Error adding rating: ', error)
        }
      }
    }
  }

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
