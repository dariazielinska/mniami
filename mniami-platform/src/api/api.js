import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { firestore } from '../firebaseConfig'

export const fetchLatestRecipes = async () => {
  try {
    const recipesCollection = collection(firestore, 'recipes')
    const q = query(recipesCollection, orderBy('createdAt', 'desc'), limit(5))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching latest recipes: ', error)
    return []
  }
}

export const fetchBestRecipes = async () => {
  try {
    const favoriteRecipesCollection = collection(firestore, 'recipes')
    const q = query(
      favoriteRecipesCollection,
      orderBy('rating', 'desc'),
      limit(5)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching favorite recipes: ', error)
    return []
  }
}

export const fetchLatestArticles = async () => {
  try {
    const articlesCollection = collection(firestore, 'articles')
    const q = query(articlesCollection, orderBy('createdAt', 'desc'), limit(5))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching latest articles: ', error)
    return []
  }
}
