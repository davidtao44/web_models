// src/components/Auth/AuthForm.jsx
import { Link } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({
  title,
  buttonText,
  onSubmit,
  onChange,
  credentials,
  error,
  showRegisterLink = false,
  showLoginLink = false,
}) => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{title}</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={onSubmit}>
          {showRegisterLink && (
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={credentials.name || ''}
                onChange={onChange}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          
          <button type="submit" className="auth-button">
            {buttonText}
          </button>
        </form>
        
        <div className="auth-links">
          {showRegisterLink && (
            <p>
              ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </p>
          )}
          {showLoginLink && (
            <p>
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;