import styled from '@emotion/styled'
import AddToFavoriteIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BackArrow from '../../components/BackArrow'
import { useFavourite } from '../../hooks/useFavourite'

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
  const { isFavourite, loading, toggleFavourite } = useFavourite(recipeId)

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <ImageContainer>
      <Image />
      <BackArrow />
      <AddToFavourite onClick={toggleFavourite}>
        {isFavourite ? <FavoriteIcon /> : <AddToFavoriteIcon />}
      </AddToFavourite>
    </ImageContainer>
  )
}

export default RecipeImage
