import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🏥 Sistema Clínico</h1>
      <button onClick={handleLogout}>Sair</button>
      <p>Bem-vindo ao painel principal.</p>
    </div>
  );
}
