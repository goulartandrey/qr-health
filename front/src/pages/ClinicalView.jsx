import { useParams } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/api';
import { Lock, ArrowLeft } from 'lucide-react';

export default function ClinicalView() {
  const { clinicalBadgeId } = useParams();

  const [password, setPassword] = useState('');
  const [clinicalInfo, setClinicalInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAccess = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await api.get(`/clinical_badges/${clinicalBadgeId}`, {
        params: { password },
      });

      console.log(res.data);

      setClinicalInfo(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Senha inválida');
    } finally {
      setLoading(false);
    }
  };

  if (clinicalInfo) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-2xl text-center font-bold text-gray-800">
              Informações Clínicas
            </h1>
          </div>

          <div className="space-y-4">
            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Tipo Sanguíneo</p>
              <p className="text-lg font-semibold">{clinicalInfo.bloodType}</p>
            </div>

            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Sexo</p>
              <p className="text-lg font-semibold">{clinicalInfo.gender}</p>
            </div>
            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Contato de Emergência</p>
              <p className="text-lg font-semibold">
                {clinicalInfo.emergencyContact}
              </p>
            </div>
            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Alergias</p>
              <p className="text-lg font-semibold">
                {clinicalInfo.allergies?.length
                  ? clinicalInfo.allergies.join(', ')
                  : 'Nenhuma'}
              </p>
            </div>
            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Doenças Crônicas</p>
              <p className="text-lg font-semibold">
                {clinicalInfo.chronicDiseases?.length
                  ? clinicalInfo.chronicDiseases.join(', ')
                  : 'Nenhuma'}
              </p>
            </div>
            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Medicamentos</p>
              <p className="text-lg font-semibold">
                {clinicalInfo.medicines?.length
                  ? clinicalInfo.medicines.join(', ')
                  : 'Nenhum'}
              </p>
            </div>
            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Cirurgias</p>
              <p className="text-lg font-semibold">
                {clinicalInfo.surgeries?.length
                  ? clinicalInfo.surgeries.join(', ')
                  : 'Nenhuma'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-gray-200 shadow-lg rounded-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <Lock className="w-12 h-12 text-teal-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Acessar Informações Clínicas
          </h2>
          <p className="text-gray-600 text-sm text-center mt-1">
            Digite a senha pública para continuar
          </p>
        </div>

        <input
          type="password"
          placeholder="Senha pública"
          className="w-full border border-gray-300 rounded-lg p-3 text-lg mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          onClick={handleAccess}
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          {loading ? 'Verificando...' : 'Acessar'}
        </button>

        <button
          onClick={() => window.history.back()}
          className="w-full text-gray-600 mt-4 hover:text-gray-800 text-sm"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
