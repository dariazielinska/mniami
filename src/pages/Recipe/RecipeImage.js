import styled from '@emotion/styled'
import AddToFavoriteIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BackArrow from '../../components/BackArrow'
import { useFavourite } from '../../hooks/useFavourite'
import imageMap from '../../assets/imageMap'

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
`

const Image = styled.img`
  width: 100%;
  height: 500px;
  border: 1px solid #ddd;
  background-color: #ddd;
  object-fit: contain;
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

function RecipeImage({ recipeId, image }) {
  const { isFavourite, loading, toggleFavourite } = useFavourite(recipeId)

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <ImageContainer>
      <Image src={imageMap[image]} alt={'recipe'} />
      <BackArrow />
      <AddToFavourite onClick={toggleFavourite}>
        {isFavourite ? <FavoriteIcon /> : <AddToFavoriteIcon />}
      </AddToFavourite>
    </ImageContainer>
  )
}

export default RecipeImage
