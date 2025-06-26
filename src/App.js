import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Features from './components/Features';
import Aurora from './Aurora';
import './App.css';
import './Aurora.css';

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
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      <div className="app-foreground">
        <header className="navbar">
          <div className="logo">
            <img src="/ch 3.png" alt="CredHex Logo" />
            <span>CredHex</span>
          </div>

          <nav className="nav-links">
            {!user && (
              <>
                <a href="#about">AboutUs</a>
                <a href="#contact">ContactUs</a>
              </>
            )}
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider"></span>
            </label>
          </nav>
        </header>

        {user ? (
          <Dashboard user={user} onLogout={() => setUser(null)} />
        ) : (
          <>
            <Auth onAuth={setUser} />
            <Features />

            <section id="about" className="info-section">
              <h2>About Us</h2>
              <p>
                CredHex is your digital certificate vault. We provide a secure and convenient way to upload, store, and manage your important documents in one place.
              </p>
            </section>

            <section id="contact" className="info-section">
              <h2>Contact Us</h2>
              <p>Email: support@credhex.com</p>
              <p>Email: deepakbhaskaran4@gmail.com</p>
              <p>Phone: +91 9744260689</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
