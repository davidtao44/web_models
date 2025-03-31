// ... existing imports and component code ...

<button type="submit" disabled={isLoading} className="auth-button">
  {isLoading ? (
    <div className="button-content">
      <div className="modern-spinner"></div>
      <span>Registrando...</span>
    </div>
  ) : (
    'Registrarse'
  )}
</button>

// ... rest of the component