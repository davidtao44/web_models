// src/components/HomePage/HomePage.jsx
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Bienvenido al Chat AI</h1>
      
      <div className="logo-container">
        <img 
          src="../../public/logos/TECON.png" 
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