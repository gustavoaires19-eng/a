
import React, { useState } from 'react';
import { User } from '../types';

interface RegistrationFormProps {
  onLogin: (user: Omit<User, 'id'>) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !socialHandle) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    if (!socialHandle.startsWith('@')) {
      setError('O @ da rede social deve começar com "@".');
      return;
    }
    setError('');
    onLogin({ name, phone, socialHandle });
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-black/30 backdrop-blur-xl rounded-xl shadow-2xl border border-yellow-400/30 shadow-yellow-500/20">
      <h2 className="text-3xl font-bold text-center text-white glow-text">Criar Conta</h2>
      <p className="text-center text-gray-300">Entre no Maranhão Chat</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-200">Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-white bg-black/40 border border-slate-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/50 transition-all"
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-gray-200">Telefone</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-white bg-black/40 border border-slate-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/50 transition-all"
            placeholder="(98) 99999-9999"
          />
        </div>
        <div>
          <label htmlFor="social" className="text-sm font-medium text-gray-200">@ da Rede Social</label>
          <input
            id="social"
            type="text"
            value={socialHandle}
            onChange={(e) => setSocialHandle(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-white bg-black/40 border border-slate-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/50 transition-all"
            placeholder="@seuusuario"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 font-semibold text-black bg-gradient-to-r from-green-500 via-yellow-400 to-red-600 rounded-lg hover:shadow-lg hover:shadow-yellow-500/40 transition-all duration-300 transform hover:-translate-y-px"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
