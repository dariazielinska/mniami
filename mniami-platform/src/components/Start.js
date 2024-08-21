import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Start() {
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
        ZAKŁADKA START
        {currentUser ? (
          <div>
            <p>Welcome, {currentUser.email}</p>
            <button onClick={handleLogout}>Wyloguj</button>
          </div>
        ) : (
          <div>
            <p>You are not logged in.</p>
            <Link to="/auth"> Zaloguj / Zarejestruj </Link>
          </div>
        )}

    </div>
  );
}

export default Start;
