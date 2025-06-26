import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Features from './components/Features';
import Aurora from './Aurora';
import './App.css';
import './Aurora.css'; // for .aurora-container styles

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
      {/* 🔮 Aurora Background */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* 🌐 Foreground UI */}
      <div className="app-foreground">
        <div className="app-header-bar">
          <h1 className="app-title">CredHex - Your Certificate Vault</h1>

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
          <>
            <Auth onAuth={setUser} />
            <Features />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
