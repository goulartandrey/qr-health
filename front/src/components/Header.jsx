import { useEffect, useState } from 'react';
import { User, LogOut } from 'lucide-react';

export default function Header({ logout }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/QRHealth2.png" className="w-32 mx-auto" alt="Logo" />
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <User className="w-5 h-5 text-gray-600" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border p-2 animate-fade">
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left rounded-md hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 text-gray-600" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
