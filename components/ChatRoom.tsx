
import React, { useState, useEffect, useRef } from 'react';
import { Room, User, Message } from '../types';
import { ArrowLeftIcon, PaperAirplaneIcon, UsersIcon, SparklesIcon } from './icons/Icons';
import { mockUsers } from '../constants';

interface ChatRoomProps {
  room: Room;
  currentUser: User;
  onLeave: () => void;
  onSendMessage: (roomId: string, message: string) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ room, currentUser, onLeave, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [room.messages]);

  useEffect(() => {
    // Simulate a bot message to make the chat more lively
    const botUser = mockUsers.find(u => u.id === 'user_2'); // Let's use Beto as bot
    if (!botUser || room.users.length < 2 || room.users.some(u => u.id === botUser.id)) return;

    const timer = setTimeout(() => {
      const botMessage: Message = {
        id: `msg_bot_${Date.now()}`,
        user: botUser,
        text: `Que bom ter você por aqui, ${currentUser.name}!`,
        timestamp: new Date(),
      };
      
      // We can't directly add to state here, so we would need another prop
      // For this example, let's just log it to avoid complexity
      // In a real app, a central state management would handle this.
      console.log("Simulating bot message:", botMessage.text);

    }, 3000);

    return () => clearTimeout(timer);
  }, [room.id, currentUser.name, room.users]);


  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(room.id, message);
      setMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-5xl h-full max-h-[90vh] flex flex-col p-0 bg-black/30 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-yellow-400/30 shadow-yellow-500/20">
      <header className="flex items-center justify-between p-4 bg-black/20 border-b border-white/20 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onLeave} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeftIcon />
          </button>
          <div>
            <h2 className="text-xl font-bold glow-text">{room.name}</h2>
            {room.topic && <p className="text-sm text-yellow-300 flex items-center gap-1"><SparklesIcon className="w-4 h-4" /> {room.topic}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
            <UsersIcon />
            <span>{room.users.length}</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {room.messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 items-end ${msg.user.id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
            {msg.user.id !== currentUser.id && (
              <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center font-bold border-2 border-slate-500">
                {msg.user.name.charAt(0)}
              </div>
            )}
            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl ${msg.user.id === currentUser.id ? 'bg-gradient-to-br from-green-600 to-green-500 rounded-br-none' : 'bg-slate-800 rounded-bl-none'}`}>
              <p className={`text-sm font-bold ${msg.user.id === currentUser.id ? 'text-white/90' : 'text-yellow-400'}`}>{msg.user.id === currentUser.id ? 'Você' : msg.user.name}</p>
              <p className="text-white break-words">{msg.text}</p>
              <p className="text-xs text-gray-400 text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-4 bg-black/30 border-t border-white/20">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-grow px-4 py-3 text-white bg-black/40 border border-slate-600 rounded-full focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/50 transition-all"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-green-600 rounded-full hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105"
          >
            <PaperAirplaneIcon />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatRoom;
