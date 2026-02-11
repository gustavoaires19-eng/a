
export interface User {
  id: string;
  name: string;
  phone: string;
  socialHandle: string;
}

export interface Message {
  id: string;
  user: User;
  text: string;
  timestamp: Date;
}

export interface Room {
  id:string;
  name: string;
  topic?: string;
  users: User[];
  messages: Message[];
}
