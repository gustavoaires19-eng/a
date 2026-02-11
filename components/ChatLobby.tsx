
import React, { useState } from 'react';
import { Room, User } from '../types';
import { MAX_USERS_PER_ROOM } from '../constants';
import { generateRoomTopic } from '../services/geminiService';
import { UsersIcon, PlusCircleIcon, ChevronRightIcon, SparklesIcon } from './icons/Icons';

interface ChatLobbyProps {
  user: User;
  rooms: Room[];
  onCreateRoom: (newRoom: Room) => void;
  onJoinRoom: (room: Room) => void;
}

const ChatLobby: React.FC<ChatLobbyProps> = ({ user, rooms, onCreateRoom, onJoinRoom }) => {
  const [newRoomName, setNewRoomName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isGeneratingTopic, setIsGeneratingTopic] = useState(false);

  const handleCreateRoom = async () => {
    if (newRoomName.trim() === '') return;
    
    setIsGeneratingTopic(true);
    const topic = await generateRoomTopic(newRoomName);
    setIsGeneratingTopic(false);
    
    const newRoom: Room = {
      id: `room_${Date.now()}`,
      name: newRoomName,
      topic: topic,
      users: [user],
      messages: []
    };
    onCreateRoom(newRoom);
    setNewRoomName('');
    setIsCreating(false);
  };

  return (
    <div className="w-full max-w-4xl h-full max-h-[80vh] flex flex-col p-6 bg-black/30 backdrop-blur-xl rounded-xl shadow-2xl border border-cyan-400/30 shadow-cyan-500/20">
      <header className="pb-4 border-b border-white/20">
        <h1 className="text-3xl font-bold glow-text">Salas de Bate-papo</h1>
        <p className="text-gray-300">Olá, {user.name}! Escolha uma sala para entrar ou crie uma nova.</p>
      </header>
      
      <div className="flex-grow overflow-y-auto mt-4 pr-2">
        <ul className="space-y-3">
          {rooms.map(room => (
            <li key={room.id}>
              <button 
                onClick={() => room.users.length < MAX_USERS_PER_ROOM && onJoinRoom(room)} 
                disabled={room.users.length >= MAX_USERS_PER_ROOM}
                className="w-full text-left p-4 bg-black/30 rounded-lg border border-transparent hover:border-cyan-400/50 hover:bg-black/50 transition-all duration-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-transparent"
              >
                <div>
                  <h3 className="font-semibold text-lg text-cyan-200">{room.name}</h3>
                  {room.topic && <p className="text-sm text-gray-300 flex items-center gap-2 pt-1"><SparklesIcon className="text-cyan-400" /> {room.topic}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <UsersIcon />
                    <span>{room.users.length} / {MAX_USERS_PER_ROOM}</span>
                  </div>
                  <ChevronRightIcon className="text-gray-500" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-4 pt-4 border-t border-white/20">
        {isCreating ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="Nome da nova sala"
              className="flex-grow px-4 py-2 text-white bg-black/40 border border-slate-600 rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
            <button
              onClick={handleCreateRoom}
              disabled={isGeneratingTopic}
              className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-px flex items-center justify-center disabled:from-gray-600 disabled:to-gray-700 disabled:shadow-none disabled:transform-none"
            >
              {isGeneratingTopic ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Gerando Tópico...
                </>
              ) : "Confirmar Criação"}
            </button>
             <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 font-semibold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors duration-300"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-px flex items-center justify-center gap-2"
          >
            <PlusCircleIcon />
            Criar Nova Sala
          </button>
        )}
      </footer>
    </div>
  );
};

export default ChatLobby;
