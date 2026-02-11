
import React, { useState, useEffect } from 'react';
import { User, Room } from './types';
import RegistrationForm from './components/RegistrationForm';
import ChatLobby from './components/ChatLobby';
import ChatRoom from './components/ChatRoom';
import { initialRooms } from './constants';

const backgrounds = [
  'https://images.unsplash.com/photo-1623190130953-0351551a3f69?q=80&w=1974&auto=format&fit=crop', // São Luís historical center at night
  'https://images.unsplash.com/photo-1594285810232-05f80f139f40?q=80&w=2070&auto=format&fit=crop', // Lençóis at dusk
  'https://images.unsplash.com/photo-1623190130983-659e563152a2?q=80&w=1974&auto=format&fit=crop', // Azulejos close-up
  'https://images.unsplash.com/photo-1610416828807-8871034c0f77?q=80&w=1935&auto=format&fit=crop', // Bumba meu boi
  'https://images.unsplash.com/photo-1582250780133-310a89d7b889?q=80&w=2071&auto=format&fit=crop', // Lençóis aerial
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    // Select a random background image on mount
    setBgImage(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  }, []);

  const handleLogin = (newUser: Omit<User, 'id'>) => {
    const userWithId = { ...newUser, id: `user_${Date.now()}` };
    setUser(userWithId);
  };

  const handleCreateRoom = (newRoom: Room) => {
    setRooms(prevRooms => [...prevRooms, newRoom]);
    setActiveRoom(newRoom);
  };
  
  const handleJoinRoom = (room: Room) => {
    if (user && !room.users.some(u => u.id === user.id)) {
      const updatedRoom = { ...room, users: [...room.users, user] };
      setRooms(rooms.map(r => r.id === room.id ? updatedRoom : r));
      setActiveRoom(updatedRoom);
    } else {
      setActiveRoom(room);
    }
  };

  const handleLeaveRoom = () => {
    if(user && activeRoom){
        const updatedRoom = { ...activeRoom, users: activeRoom.users.filter(u => u.id !== user.id) };
        setRooms(rooms.map(r => r.id === activeRoom.id ? updatedRoom : r));
    }
    setActiveRoom(null);
  };

  const handleAddMessage = (roomId: string, message: string) => {
    if (!user) return;
    const newMessage = {
      id: `msg_${Date.now()}`,
      user: user,
      text: message,
      timestamp: new Date(),
    };
    
    const updatedRooms = rooms.map(room => {
      if (room.id === roomId) {
        return { ...room, messages: [...room.messages, newMessage] };
      }
      return room;
    });

    setRooms(updatedRooms);
    setActiveRoom(updatedRooms.find(r => r.id === roomId) || null);
  };

  return (
    <main 
      className="h-screen w-screen bg-cover bg-center bg-fixed text-white" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/50 to-black/60 backdrop-blur-sm" />
      <div className="relative h-full w-full flex flex-col items-center justify-center p-4">
        {!user ? (
          <RegistrationForm onLogin={handleLogin} />
        ) : !activeRoom ? (
          <ChatLobby 
            user={user}
            rooms={rooms} 
            onCreateRoom={handleCreateRoom} 
            onJoinRoom={handleJoinRoom}
          />
        ) : (
          <ChatRoom 
            room={activeRoom}
            currentUser={user} 
            onLeave={handleLeaveRoom}
            onSendMessage={handleAddMessage}
          />
        )}
      </div>
    </main>
  );
}
