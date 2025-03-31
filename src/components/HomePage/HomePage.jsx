// src/components/HomePage/HomePage.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; // Add this import
import { useAuth } from '../../context/AuthContext'; // Add this import
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Redirect to chat if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/chat');
    }
  }, [currentUser, navigate]);

  return (
    <div className="home-page">
      <h1>Bienvenido al Chat AI</h1>
      
      <div className="logo-container">
        <img 
          src="/logos/TECON.PNG" 
          alt="Logo TECON" 
        />
      </div>
      
      <p>Conecta con la inteligencia artificial desplegada en la región</p>
      
      <div className="auth-buttons">
        <button 
          onClick={() => navigate('/login')} 
          className="auth-button login-button"
        >
          Iniciar Sesión
        </button>
        
        <button 
          onClick={() => navigate('/register')} 
          className="auth-button register-button"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default HomePage;