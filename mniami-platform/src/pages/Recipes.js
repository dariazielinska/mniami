import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../firebaseConfig'
import { Link } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesCollection = collection(firestore, 'recipes')
        const recipesSnapshot = await getDocs(recipesCollection)
        const recipesList = recipesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setRecipes(recipesList)
      } catch (error) {
        console.error('Error fetching recipes: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  return (
    <div>
      <Header />
      ZAKŁADKA PRZEPISY
      {loading ? (
        <p>Loading recipes...</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
              {recipe.title}
            </Link>
          ))}
        </ul>
      )}
      <Footer />
    </div>
  )
}

export default Recipes
