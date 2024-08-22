import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

function Article() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRef = doc(firestore, 'articles', id)
        const articleSnap = await getDoc(articleRef)

        if (articleSnap.exists()) {
          setArticle(articleSnap.data())
        }
      } catch (e) {
        console.error('Error fetching article: ', e)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  if (loading) {
    return <p>Loading article...</p>
  }

  return (
    <div>
      <Header />
      ZAKŁADKA ARTYKUŁ
      <div>
        {article ? (
          <div>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
          </div>
        ) : (
          <p>Article not found.</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Article
