import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user || null));
  }, []);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="app-header-bar">
        <h1 className="app-title">CredHex - Your Certificate Vault</h1>

        {/* ✅ Toggle now always visible */}
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {user ? (
        <Dashboard user={user} onLogout={() => setUser(null)} />
      ) : (
        <Auth onAuth={setUser} />
      )}
    </div>
  );
}

export default App;
