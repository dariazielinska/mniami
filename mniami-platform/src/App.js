import './App.css';
import  { BrowserRouter, Routes, Route } from 'react-router-dom'
import Start from './components/Start';
import Help from './components/Help';
import Pricing from './components/Pricing';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import Articles from './components/Articles';
import Article from './components/Article';
import LoginRegister from './components/LoginRegister';
import UserProfile from './components/UserProfile';
import Favourites from './components/Favourites';
import Plan from './components/Plan';
import ShoppingList from './components/ShoppingList';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Start/>} />
          <Route path='/landing' element={<Start/>} />
          <Route path='/help' element={<Help/>} />
          <Route path='/pricing' element={<Pricing/>} />
          <Route path='/recipes' element={<Recipes/>} />
          <Route path='/recipe' element={<Recipe/>} />
          <Route path='/articles' element={<Articles/>} />
          <Route path='/article' element={<Article/>} />
          <Route path='/login' element={<LoginRegister/>} />
          <Route path='/profile' element={<UserProfile/>} />
          <Route path='/favourites' element={<Favourites/>} />
          <Route path='/plan' element={<Plan/>} />
          <Route path='/shopping-list' element={<ShoppingList/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
