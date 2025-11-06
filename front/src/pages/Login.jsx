import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === '123') {
      localStorage.setItem('token', 'fake-jwt-token');
      navigate('/home');
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
        <form className="border border-amber-500" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="text-red-700">
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}
