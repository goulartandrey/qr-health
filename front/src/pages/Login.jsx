import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.access_token);

      navigate('/');
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        setErrorMsg(
          'Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente.',
        );
        return;
      }

      if (
        (error.response && error.response.status === 401) ||
        error.response.status === 404
      ) {
        setErrorMsg('Email ou senha inválidos.');
        return;
      }

      setErrorMsg('Ocorreu um erro inesperado. Tente novamente.');
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-100 flex justify-center items-center">
      <div className="w-[360px] bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center gap-6">
        <img src="/QRHealth2.png" className="w-28 mx-auto" alt="Logo" />

        <h2 className="text-2xl font-semibold text-gray-700">Faça seu login</h2>
        {errorMsg && (
          <p style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</p>
        )}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="E-mail"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-teal-700 text-white rounded-lg py-2 font-semibold hover:bg-teal-800 transition-all"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link
            to="/register"
            className="text-teal-700 font-medium hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
