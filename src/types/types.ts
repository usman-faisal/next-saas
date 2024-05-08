export interface Profile {
  email: string;
  id: string;
  name: string;
  phone: string;
}
export interface Inbox {
  id: number;
  created_at: string;
  user1: Profile;
  user2: Profile;
}
export interface Message {
  id: number;
  created_at: string;
  inbox: number;
  sender: string;
  content: string;
}
