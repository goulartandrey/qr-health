import { QrCode, Save, Cog } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Actions({
  saveClinical,
  hasChanges,
  generateQr,
  clinicalBadge,
  publicPassword,
  user,
}) {
  const finalPublicPassword = clinicalBadge?.publicPassword;
  const qrReady = !!finalPublicPassword;

  const hasPublicPassword = (publicPassword || '').trim() !== '';

  const canCreateFirstTime =
    !clinicalBadge && user?.clinicalInfo?.id && hasPublicPassword;

  const canUpdateExisting =
    !!clinicalBadge && publicPassword.trim() !== clinicalBadge.publicPassword;

  const canGenerateQR = canCreateFirstTime || canUpdateExisting;

  const canViewQr = () => {
    return Boolean(clinicalBadge && !hasChanges());
  };

  return (
    <div className="flex gap-2 mb-1 mt-3">
      <button
        onClick={saveClinical}
        disabled={!hasChanges()}
        className="mt-3 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 disabled:bg-gray-400 transition-colors text-sm font-medium flex items-center justify-center gap-2"
      >
        <Save className="w-4 h-4" />
        Salvar alterações
      </button>

      <button
        onClick={generateQr}
        disabled={!canGenerateQR}
        className={`mt-3 px-6 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
          canGenerateQR
            ? 'bg-teal-600 text-white cursor-pointer'
            : 'bg-gray-400 text-white'
        }`}
      >
        <Cog className="w-4 h-4" />
        Gerar QR Code
      </button>

      <Link
        to={canViewQr() ? '/qrcode' : '#'}
        state={{
          publicPassword: finalPublicPassword,
          userName: user?.firstName,
          clinicalBadgeId: clinicalBadge?.id,
        }}
        onClick={(e) => {
          if (!canViewQr()) {
            e.preventDefault();

            if (!clinicalBadge) {
              alert('Gere seu QR Code antes de visualizar.');
            } else if (hasChanges()) {
              alert(
                'Você alterou suas informações. Salve primeiro antes de visualizar o QR Code.',
              );
            }
          }
        }}
        className={`mt-3 px-6 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
          canViewQr()
            ? 'bg-teal-600 text-white hover:bg-teal-700 cursor-pointer'
            : 'bg-gray-400 text-white pointer-events-none'
        }`}
      >
        <QrCode className="w-4 h-4" />
        Visualizar QR Code
      </Link>
    </div>
  );
}
