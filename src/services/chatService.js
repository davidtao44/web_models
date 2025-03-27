// src/services/chatService.js
const API_URL = 'http://tu-backend-fastapi.com/api/chat';

export default {
  async sendPrompt(prompt, token) {
    const response = await fetch(`${API_URL}/prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });
    
    if (!response.ok) {
      throw new Error('Error al enviar el prompt');
    }
    
    return await response.json();
  },
};