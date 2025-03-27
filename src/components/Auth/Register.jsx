// src/components/Auth/Register.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AuthForm from './AuthForm';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
    } catch (err) {
      setError('Error en el registro. Por favor, intenta nuevamente.');
    }
  };

  return (
    <AuthForm
      title="Registrarse"
      buttonText="Crear Cuenta"
      onSubmit={handleSubmit}
      onChange={handleChange}
      credentials={userData}
      error={error}
      showLoginLink
    />
  );
};

export default Register;