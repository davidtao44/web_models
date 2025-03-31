import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Add this line to use the login function from context

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (!formData.email || !formData.password) {
        throw new Error('Por favor completa todos los campos');
      }
      
      // Use the login function from AuthContext instead of direct API call
      await login({
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login successful, navigating to /chat');
      
      // Redirect to chat page
      navigate('/chat');
    } catch (err) {
      // Handle API errors
      console.error('Login error:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'Error al iniciar sesión');
      } else {
        setError(err.message || 'Error al iniciar sesión');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Iniciar Sesión</h1>
          <p className="auth-subtitle">Bienvenido de nuevo</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="email" className="input-label">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
              placeholder="tu@email.com"
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <button type="submit" disabled={isLoading} className="auth-button">
            {isLoading ? (
              <div className="button-content">
                <div className="modern-spinner"></div>
                <span>Iniciando sesión...</span>
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>¿No tienes una cuenta? <span className="auth-link" onClick={() => navigate('/register')}>Regístrate</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;