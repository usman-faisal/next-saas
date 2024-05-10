export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface AppNotification {
  id: number;
  title: string;
  description: string;
  isRead: boolean;
}


export interface Chat {
  id: string;
  message: string;
  sender: string;
  inbox: string;
}

export interface UserForm {
  institution: string;
  location: string;
  specialty: string;
  year: string;
  id?: string;
  user?: string;
}

export interface Match {
  id: number;
  user1: Profile;
  user2: Profile;
  fields: string;
}

export interface Profile {
  email?: string;
  id: string;
  name: string;
  phone?: string;
}
export interface Inbox {
  id?: number;
  created_at?: string;
  user1: Profile | string;
  user2: Profile | string;
}
export interface Message {
  id: number;
  created_at: string;
  inbox: number;
  sender: string;
  content: string;
}


