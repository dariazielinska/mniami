import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../firebaseConfig'
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
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthProvider'

const RecipeContainer = styled.div``

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

const Title = styled.h1`
  width: 90%;
  margin: 20px auto;
  font-size: 24px;
  font-weight: 500;
`

function Recipe() {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = doc(firestore, 'recipes', id)
        const recipeSnap = await getDoc(recipeRef)

        if (recipeSnap.exists()) {
          setRecipe(recipeSnap.data())
        }

        const checkIfFavorite = async () => {
          if (!currentUser) return

          const favouritesRef = doc(firestore, 'favourites', currentUser.uid)
          const favouritesSnap = await getDoc(favouritesRef)

          if (favouritesSnap.exists()) {
            const favouritesData = favouritesSnap.data()
            setIsFavorite(favouritesData.recipes?.includes(id))
          }
        }

        await checkIfFavorite()
      } catch (e) {
        console.error('Error fetching recipe: ', e)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id, currentUser])

  if (loading) {
    return <p>Loading recipe...</p>
  }

  const handleFavouriteToggle = async () => {
    if (!currentUser) {
      console.log('User is not logged in')
      return
    }

    const favouritesRef = doc(firestore, 'favourites', currentUser.uid)

    try {
      if (isFavorite) {
        await updateDoc(favouritesRef, {
          recipes: arrayRemove(id),
        })
      } else {
        await updateDoc(favouritesRef, {
          recipes: arrayUnion(id),
        })
      }
      setIsFavorite(!isFavorite)
    } catch (e) {
      console.error('Error updating favorite status: ', e)
    }
  }

  return (
    <div>
      <Header />
      {recipe ? (
        <RecipeContainer>
          <ImageContainer>
            <Image />
            <AddToFavourite onClick={handleFavouriteToggle}>
              {isFavorite ? <FavoriteIcon /> : <AddToFavoriteIcon />}
            </AddToFavourite>
          </ImageContainer>
          <Title>{recipe.title}</Title>
        </RecipeContainer>
      ) : (
        <p>Recipe not found.</p>
      )}
      <Footer />
    </div>
  )
}

export default Recipe
