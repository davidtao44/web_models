import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importa el CSS aquí

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!email || !password) {
        throw new Error('Por favor completa todos los campos');
      }
      
      console.log('Datos de login:', { email, password });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-card">
        <div className="login-form-header">
          <h1 className="login-form-title">Bienvenido</h1>
          <p className="login-form-subtitle">Ingresa a tu cuenta para continuar</p>
        </div>

        {error && (
          <div className="login-form-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-form-input"
              placeholder="tu@email.com"
              disabled={isLoading}
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-form-input"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <div className="login-form-options">
            <div className="login-form-remember">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label htmlFor="remember-me">Recordarme</label>
            </div>

            <a href="#" className="login-form-forgot">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="login-form-button"
          >
            {isLoading ? (
              <>
                <svg className="login-form-spinner -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        <div className="login-form-register">
          <p>
            ¿No tienes una cuenta?{' '}
            <a href="/register" className="login-form-register-link">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;