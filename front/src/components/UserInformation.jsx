import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { User, QrCode, Edit, Eye, EyeOff } from 'lucide-react';

export default function UserInformation({
  user,
  bloodType,
  setBloodType,
  gender,
  setGender,
  emergencyContact,
  setEmergencyContact,
  publicPassword,
  setPublicPassword,
  showPassword,
  setShowPassword,
  isEditingPassword,
  setIsEditingPassword,
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user?.firstName} {user?.lastName}
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-lg p-2">
              <QrCode className="w-full h-full text-gray-800" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-1">
          <div>
            <p className="text-xs text-gray-500 mb-1">Tipo Sanguíneo</p>
            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              className="w-36 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
            >
              <option value="">Selecione</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Sexo</p>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-36 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-500 mb-1">
              Contato de Emergência
            </label>

            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, '');
                setEmergencyContact(onlyNumbers);
              }}
              maxLength={11}
              minLength={11}
              placeholder="(xx) xxxxx-xxxx"
              className="w-36 h-9.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Senha pública</p>
            <div className="flex items-center gap-2">
              {isEditingPassword ? (
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={publicPassword}
                  onChange={(e) => setPublicPassword(e.target.value)}
                  onBlur={() => setIsEditingPassword(false)}
                  className="text-lg font-semibold text-gray-800 border border-teal-500 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Digite a senha pública"
                  autoFocus
                />
              ) : (
                <p
                  onClick={() => setIsEditingPassword(true)}
                  className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-teal-600 transition-colors"
                >
                  {publicPassword ? (
                    showPassword ? (
                      publicPassword
                    ) : (
                      '********'
                    )
                  ) : (
                    <span className="flex items-center gap-1 text-gray-600 cursor-pointer hover:text-teal-600 transition-colors">
                      <Edit className="w-4 h-4" />
                      Definir senha
                    </span>
                  )}
                </p>
              )}
              {publicPassword && (
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
