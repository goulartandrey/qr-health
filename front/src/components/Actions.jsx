// import { QrCode, Save, Cog } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function Actions({
//   saveClinical,
//   hasChanges,
//   generateQr,
//   clinicalBadge,
//   publicPassword,
//   user,
// }) {
//   return (
//     <div className="flex gap-2 mb-1 mt-3">
//       <button
//         onClick={saveClinical}
//         disabled={!hasChanges()}
//         className="mt-3 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 disabled:bg-gray-400 transition-colors text-sm font-medium flex items-center justify-center gap-2"
//       >
//         <Save className="w-4 h-4" />
//         Salvar alterações
//       </button>
//       <button
//         onClick={generateQr}
//         disabled={!user?.clinicalInfo?.id || !publicPassword}
//         className={`mt-3 px-6 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
//           user?.clinicalInfo?.id && publicPassword
//             ? 'bg-teal-600 text-white cursor-pointer'
//             : 'bg-gray-400 text-white'
//         }`}
//       >
//         <Cog className="w-4 h-4" />
//         {clinicalBadge ? 'Atualizar QR Code' : 'Gerar QR Code'}
//       </button>
//       <Link
//         to={clinicalBadge ? '/qrcode' : '#'}
//         state={{
//           publicPassword: clinicalBadge?.publicPassword || publicPassword,
//           userName: user?.firstName,
//         }}
//         onClick={(e) => {
//           if (!clinicalBadge) {
//             e.preventDefault();
//             alert(
//               'Salve suas informações clínicas primeiro para gerar o QR Code!',
//             );
//           }
//         }}
//         className={`mt-3 px-6 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
//           clinicalBadge
//             ? 'bg-teal-600 text-white hover:bg-teal-700 cursor-pointer'
//             : 'bg-gray-400 text-white pointer-events-none'
//         }`}
//       >
//         <QrCode className="w-4 h-4" />
//         Visualizar QR Code
//       </Link>
//     </div>
//   );
// }
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
  const finalPublicPassword = clinicalBadge?.publicPassword || publicPassword;

  const qrReady = !!finalPublicPassword;

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
        disabled={!user?.clinicalInfo?.id}
        className={`mt-3 px-6 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
          user?.clinicalInfo?.id
            ? 'bg-teal-600 text-white cursor-pointer'
            : 'bg-gray-400 text-white'
        }`}
      >
        <Cog className="w-4 h-4" />
        {clinicalBadge ? 'Atualizar QR Code' : 'Gerar QR Code'}
      </button>

      <Link
        to={qrReady ? '/qrcode' : '#'}
        state={{
          publicPassword: finalPublicPassword,
          userName: user?.firstName,
          clinicalBadgeId: clinicalBadge?.id,
        }}
        onClick={(e) => {
          if (!qrReady) {
            e.preventDefault();
            alert('Gere seu QR Code primeiro!');
          }
        }}
        className={`mt-3 px-6 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
          qrReady
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
