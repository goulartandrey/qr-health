import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, X } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

export default function QRCodePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clinicalBadgeId, publicPassword, userName } = location.state || {};

  // const fullUrl = `${baseUrl}/${publicPassword}`;
  const fullUrl = `${window.location.origin}/clinical/${clinicalBadgeId}`;

  const downloadQRCode = () => {
    const canvas = document.getElementById('qrcode-canvas');
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `qrcode-${userName || 'clinical'}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  if (!publicPassword) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Senha pública não encontrada</p>
          <button
            onClick={() => navigate(-1)}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Voltar ao dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/QRHealth2.png" className="w-32" alt="Logo" />
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Seu QR Code Clínico
              </h1>
              <p className="text-gray-600">
                Escaneie para acessar suas informações clínicas
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
              <QRCodeCanvas
                id="qrcode-canvas"
                value={fullUrl}
                size={300}
                level="H"
                marginSize={5}
              />
            </div>
            <div className="w-full bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-2">Senha Pública:</p>
              <p className="text-lg font-mono font-semibold text-gray-800 break-all">
                {publicPassword}
              </p>
            </div>
            <div className="w-full bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-700 mb-2">Link de Acesso:</p>
              <p className="text-sm font-mono text-blue-900 break-all">
                {fullUrl}
              </p>
            </div>

            <button
              onClick={downloadQRCode}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-4 rounded-lg hover:bg-teal-700 transition-colors font-medium text-lg"
            >
              <Download className="w-6 h-6" />
              Baixar QR Code
            </button>

            <div className="w-full bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800 text-center">
                ⚠️ Mantenha sua senha pública segura e compartilhe apenas com
                profissionais de saúde autorizados
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
