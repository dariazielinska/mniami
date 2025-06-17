import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebaseConfig'

export const fetchAllArticles = async () => {
  try {
    const articlesCollection = collection(firestore, 'articles')
    const articlesSnapshot = await getDocs(articlesCollection)
    return articlesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching articles: ', error)
    throw error
  }
}

export const fetchArticleById = async (id) => {
  try {
    const articleRef = doc(firestore, 'articles', id)
    const articleSnap = await getDoc(articleRef)

    if (articleSnap.exists()) {
      return articleSnap.data()
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching article: ', error)
    throw error
  }
}
