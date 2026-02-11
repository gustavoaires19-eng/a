
import { Room, User } from './types';

export const MAX_USERS_PER_ROOM = 10;

export const mockUsers: User[] = [
  { id: 'user_1', name: 'Ana', phone: '98988887777', socialHandle: '@anaclara' },
  { id: 'user_2', name: 'Beto', phone: '98988886666', socialHandle: '@betocosta' },
  { id: 'user_3', name: 'Carla', phone: '98988885555', socialHandle: '@carlinha' },
];

export const initialRooms: Room[] = [
  {
    id: 'room_1',
    name: 'Centro Histórico',
    topic: 'Como a Realidade Aumentada poderia transformar a visita aos casarões?',
    users: [mockUsers[0]],
    messages: [
      { id: 'msg_1', user: mockUsers[0], text: 'Olá, pessoal! Bem-vindos.', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
      { id: 'msg_2', user: mockUsers[1], text: 'Oi, Ana! Tudo bem?', timestamp: new Date(Date.now() - 1000 * 60 * 4) },
    ]
  },
  {
    id: 'room_2',
    name: 'Renascença',
    topic: 'Imagine um show de drones sobre a Lagoa da Jansen. Qual seria o tema?',
    users: [mockUsers[1], mockUsers[2]],
    messages: []
  },
  {
    id: 'room_3',
    name: "Ponta d'Areia",
    topic: "Se você pudesse projetar uma barraca de praia futurista, o que ela teria?",
    users: [],
    messages: []
  }
];
