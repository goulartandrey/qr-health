import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !lastName || !email || !password || !confirmPassword) {
      alert('Preencha todos os campos!');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não conferem!');
      return;
    }

    try {
      await axios.post('http://localhost:3000/users', {
        firstName: name,
        lastName,
        email,
        password,
      });

      alert('Usuário criado com sucesso!');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-100 flex justify-center items-center">
      <div className="w-[360px] bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center gap-6">
        <img src="/QRHealth2.png" className="w-28 mx-auto" alt="Logo" />

        <h2 className="text-2xl font-semibold text-gray-700">Faça seu login</h2>

        <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sobrenome"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Repetir senha"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-teal-700 text-white rounded-lg py-2 font-semibold hover:bg-teal-800 transition-all"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-sm text-gray-600">
          Já possui uma conta?{' '}
          <Link
            to="/login"
            className="text-teal-700 font-medium hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
