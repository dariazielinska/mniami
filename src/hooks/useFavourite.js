import { useState, useEffect } from 'react'
import { firestore } from '../firebaseConfig'
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'

export const useFavourite = (recipeId) => {
  const { currentUser } = useAuth()
  const [isFavourite, setIsFavourite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkIfFavourite = async () => {
      if (!currentUser) return

      try {
        const favouritesRef = doc(firestore, 'favourites', currentUser.uid)
        const favouritesSnap = await getDoc(favouritesRef)

        if (favouritesSnap.exists()) {
          const favouritesData = favouritesSnap.data()
          setIsFavourite(favouritesData.recipes?.includes(recipeId))
        }
      } catch (e) {
        console.error('Error checking favorite status: ', e)
      } finally {
        setLoading(false)
      }
    }

    checkIfFavourite()
  }, [recipeId, currentUser])

  const toggleFavourite = async () => {
    if (!currentUser) {
      console.log('User is not logged in')
      return
    }

    const favouritesRef = doc(firestore, 'favourites', currentUser.uid)

    try {
      if (isFavourite) {
        await updateDoc(favouritesRef, {
          recipes: arrayRemove(recipeId),
        })
      } else {
        await updateDoc(favouritesRef, {
          recipes: arrayUnion(recipeId),
        })
      }
      setIsFavourite(!isFavourite)
    } catch (e) {
      console.error('Error updating favorite status: ', e)
    }
  }

  return { isFavourite, loading, toggleFavourite }
}
