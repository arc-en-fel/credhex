import { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Auth.css';

export default function Auth({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let result;

    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    if (result.error) setError(result.error.message);
    else onAuth(result.data.session?.user || result.data.user);
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'} to CredHex</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'New user? Register here.' : 'Already have an account? Login'}
      </p>
    </div>
  );
}
