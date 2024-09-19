import { useState, useEffect } from 'react'
import { firestore } from '../firebaseConfig'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'

export const useRating = (recipeId) => {
  const [averageRating, setAverageRating] = useState(0)
  const [votesCount, setVotesCount] = useState(0)
  const [userRating, setUserRating] = useState(null)
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchRatings = async () => {
      if (!currentUser) return

      const ratingsRef = collection(firestore, 'ratings')
      const q = query(ratingsRef, where('recipeId', '==', recipeId))
      const querySnapshot = await getDocs(q)

      let totalRating = 0
      let count = 0
      let userRating = null

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        totalRating += data.rating
        count += 1

        if (data.userId === currentUser.uid) {
          userRating = data.rating
        }
      })

      const avgRating = count > 0 ? (totalRating / count).toFixed(2) : 0

      setAverageRating(parseFloat(avgRating))
      setVotesCount(count)
      setUserRating(userRating)
    }

    fetchRatings()
  }, [recipeId, currentUser])

  const handleRating = async (rating) => {
    if (currentUser && userRating === null) {
      try {
        const ratingsRef = collection(firestore, 'ratings')
        await addDoc(ratingsRef, {
          recipeId: recipeId,
          userId: currentUser.uid,
          rating: rating,
        })

        const ratingsRefUpdated = collection(firestore, 'ratings')
        const qUpdated = query(
          ratingsRefUpdated,
          where('recipeId', '==', recipeId)
        )
        const querySnapshotUpdated = await getDocs(qUpdated)

        let totalRating = 0
        let count = 0

        querySnapshotUpdated.forEach((doc) => {
          const data = doc.data()
          totalRating += data.rating
          count += 1
        })

        const avgRating = count > 0 ? (totalRating / count).toFixed(2) : 0

        setAverageRating(parseFloat(avgRating))
        setVotesCount(count)
        setUserRating(rating)
      } catch (error) {
        console.error('Error adding rating: ', error)
      }
    }
  }

  return { averageRating, votesCount, userRating, handleRating }
}
