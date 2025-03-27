// src/components/Auth/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AuthForm from './AuthForm';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
    } catch (err) {
      setError('Credenciales inválidas. Por favor, intenta nuevamente.');
    }
  };

  return (
    <AuthForm
      title="Iniciar Sesión"
      buttonText="Ingresar"
      onSubmit={handleSubmit}
      onChange={handleChange}
      credentials={credentials}
      error={error}
      showRegisterLink
    />
  );
};

export default Login;