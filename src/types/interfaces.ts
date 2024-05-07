export interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface AppNotification {
  id: number;
  title: string;
  description: string;
  isRead: boolean;
}

export interface Inbox {
  id: string;
  user: User;
  lastMessage: string;
}

export interface Chat {
  id: string;
  message: string;
  sender: string;
  inbox: string;
}
