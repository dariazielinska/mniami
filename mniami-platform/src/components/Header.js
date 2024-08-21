import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await logout();
          navigate('/');
        } catch (e) {
          console.error("Failed to log out", e);
        }
      };
    
    return (
      <div>
          <Link to="/"> HEADER - LOGO </Link>

          {currentUser ? 
          <div>
            <Link to="/articles"> Baza wiedzy </Link>
            <Link to="/recipes"> Przepisy </Link>
            <Link to="/plan"> Plan posiłków </Link>
            <Link to="/shopping-list"> Lista zakupów </Link>
            <Link to="/favourites"> Ulubione </Link>
            <Link to="/profile"> Mój profil </Link>
            <button onClick={handleLogout}>Wyloguj</button>
          </div>
            :
          <div>
            <Link to="/discover"> Odkrywaj </Link>
            <Link to="/pricing"> Subskrypcja </Link>
            <Link to="/help"> Pomoc </Link>
            <Link to="/auth"> Załóż konto </Link>
            <Link to="/auth"> Zaloguj się </Link>
          </div>
          }
      </div>
    );
  }
  
  export default Header;