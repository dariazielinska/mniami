import { useEffect, useState } from 'react'
import { firestore } from '../../firebaseConfig'
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import styled from '@emotion/styled'
import AddToFavoriteIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BackArrow from '../../components/BackArrow'
import { useAuth } from '../../contexts/AuthProvider'

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
`

const Image = styled.div`
  width: 100%;
  height: 250px;
  border: 1px solid #ddd;
  background-color: #ddd;
`

const AddToFavourite = styled.span`
  position: absolute;
  bottom: 30px;
  right: 30px;
  content: '';
  cursor: pointer;

  svg {
    font-size: 34px;
    color: #333;
  }
`

function RecipeImage({ recipeId }) {
  const { currentUser } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!currentUser) return

      try {
        const favouritesRef = doc(firestore, 'favourites', currentUser.uid)
        const favouritesSnap = await getDoc(favouritesRef)

        if (favouritesSnap.exists()) {
          const favouritesData = favouritesSnap.data()
          setIsFavorite(favouritesData.recipes?.includes(recipeId))
        }
      } catch (e) {
        console.error('Error checking favorite status: ', e)
      } finally {
        setLoading(false)
      }
    }

    checkIfFavorite()
  }, [recipeId, currentUser])

  const handleFavouriteToggle = async () => {
    if (!currentUser) {
      console.log('User is not logged in')
      return
    }

    const favouritesRef = doc(firestore, 'favourites', currentUser.uid)

    try {
      if (isFavorite) {
        await updateDoc(favouritesRef, {
          recipes: arrayRemove(recipeId),
        })
      } else {
        await updateDoc(favouritesRef, {
          recipes: arrayUnion(recipeId),
        })
      }
      setIsFavorite(!isFavorite)
    } catch (e) {
      console.error('Error updating favorite status: ', e)
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <ImageContainer>
      <Image />
      <BackArrow />
      <AddToFavourite onClick={handleFavouriteToggle}>
        {isFavorite ? <FavoriteIcon /> : <AddToFavoriteIcon />}
      </AddToFavourite>
    </ImageContainer>
  )
}

export default RecipeImage
