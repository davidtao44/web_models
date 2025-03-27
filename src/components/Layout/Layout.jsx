// src/components/Layout/Layout.jsx
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Cargando aplicación...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} AI Chat App - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Layout;