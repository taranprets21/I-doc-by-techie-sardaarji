import { useState } from 'react';
import { useAuth } from '../AuthProvider.jsx';

function LoginForm() {
  const { login, error } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('Use admin/password to sign in.');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setMessage('Signing in...');
    try {
      await login(username, password);
      setStatus('success');
      setMessage('Welcome back! Access the workflow below.');
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Unable to sign in.');
    }
  };

  return (
    <div className="login-card">
      <h3>Secure login</h3>
      <p className="login-note">Sign in to access the device workflow, diagnostics API, and report generation features.</p>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button className="button primary" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className={`login-status ${status}`}>{message}</p>
      {error && <p className="login-error">{error.message || 'Login failed.'}</p>}
    </div>
  );
}

export default LoginForm;
