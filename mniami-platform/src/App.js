import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import Help from './pages/Help'
import Pricing from './pages/Pricing'
import Recipes from './pages/Recipes'
import Recipe from './pages/Recipe'
import Articles from './pages/Articles'
import Article from './pages/Article'
import LoginRegister from './pages/LoginRegister'
import UserProfile from './pages/UserProfile'
import Favourites from './pages/Favourites'
import Plan from './pages/Plan'
import ShoppingList from './pages/ShoppingList'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route path="/landing" element={<Start />} />
        <Route path="/discover" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article" element={<Article />} />
        <Route path="/auth" element={<LoginRegister />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
