// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/login';
import Register from './components/Auth/Register';
import ChatWindow from './components/Chat/ChatWindow';
import './App.css'; 

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/chat" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/chat" element={<ChatWindow />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              
            </Routes>
          </Layout>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;