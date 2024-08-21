import { useAuth } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Start() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate('/recipes')
    }
  }, [currentUser, navigate])

  return (
    <div>
      <Header />
      ZAKŁADKA START
      <Footer />
    </div>
  )
}

export default Start
