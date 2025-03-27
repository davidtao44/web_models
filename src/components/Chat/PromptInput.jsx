// src/components/Chat/PromptInput.jsx
import { useState } from 'react';
import './PromptInput.css';

const PromptInput = ({ onSend, loading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !loading) {
      onSend(prompt);
      setPrompt('');
    }
  };

  return (
    <form className="prompt-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Escribe tu prompt aquí..."
        disabled={loading}
      />
      <button type="submit" disabled={!prompt.trim() || loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
};

export default PromptInput;