import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('Por favor completa todos los campos');
      }
      
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
      
      // Send registration data to backend
      const { confirmPassword, ...registrationData } = formData;
      const response = await authService.register(registrationData);
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.access_token);
      
      // Redirect to login page
      navigate('/login');
    } catch (err) {
      // Handle API errors
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'Error en el registro');
      } else {
        setError(err.message || 'Error en el registro');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Crea tu cuenta</h1>
          <p className="auth-subtitle">Comienza tu experiencia con nosotros</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="name" className="input-label">Nombre completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="auth-input"
              placeholder="Tu nombre"
              disabled={isLoading}
            />
          </div>

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

          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="auth-input"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <button type="submit" disabled={isLoading} className="auth-button">
            {isLoading ? (
              <>
                <svg className="auth-spinner w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creando cuenta...
              </>
            ) : (
              'Registrarse'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>¿Ya tienes una cuenta? <span className="auth-link" onClick={() => navigate('/login')}>Inicia sesión</span></p>
        </div>
      </div>
    </div>
  );
};

export default Register;