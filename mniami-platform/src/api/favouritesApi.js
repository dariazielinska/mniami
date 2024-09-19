import { collection, doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebaseConfig'

export const fetchUserFavourites = async (userId) => {
  try {
    const favDocRef = doc(firestore, 'favourites', userId)
    const favDoc = await getDoc(favDocRef)

    if (favDoc.exists()) {
      const data = favDoc.data()
      return {
        recipes: data.recipes || [],
        articles: data.articles || [],
      }
    }

    return { recipes: [], articles: [] }
  } catch (error) {
    console.error('Error fetching favourites: ', error)
    throw error
  }
}

export const fetchRecipesDetails = async (recipeIds) => {
  try {
    const recipeCollection = collection(firestore, 'recipes')
    const recipesPromises = recipeIds.map((id) =>
      getDoc(doc(recipeCollection, id))
    )
    const recipesDocs = await Promise.all(recipesPromises)
    return recipesDocs.reduce((acc, doc) => {
      if (doc.exists()) acc[doc.id] = doc.data()
      return acc
    }, {})
  } catch (error) {
    console.error('Error fetching recipes details: ', error)
    throw error
  }
}

export const fetchArticlesDetails = async (articleIds) => {
  try {
    const articleCollection = collection(firestore, 'articles')
    const articlesPromises = articleIds.map((id) =>
      getDoc(doc(articleCollection, id))
    )
    const articlesDocs = await Promise.all(articlesPromises)
    return articlesDocs.reduce((acc, doc) => {
      if (doc.exists()) acc[doc.id] = doc.data()
      return acc
    }, {})
  } catch (error) {
    console.error('Error fetching articles details: ', error)
    throw error
  }
}
