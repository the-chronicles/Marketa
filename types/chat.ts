import { Timestamp, QueryDocumentSnapshot } from 'firebase/firestore';

export type ParticipantRole = 'buyer' | 'seller' | 'rider' | 'support';

export interface Participant {
  role: ParticipantRole;
  displayName: string;
  photoURL?: string | null;
}

export interface Conversation {
  id: string;
  memberIds: string[];
  participants: Record<string, Participant>;
  lastMessage?: {
    text?: string;
    senderId: string;
    createdAt: Timestamp;
  };
  lastReadAt?: Record<string, Timestamp>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  orderId?: string | null;
}

export interface Message {
  id: string;
  text?: string;
  imageUrl?: string;
  audioUrl?: string;
  senderId: string;
  createdAt: Timestamp;
}

// Firestore converters
export const conversationConverter = {
  toFirestore: (data: Omit<Conversation, 'id'>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    ({ id: snap.id, ...snap.data() } as Conversation)
};

export const messageConverter = {
  toFirestore: (data: Omit<Message, 'id'>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    ({ id: snap.id, ...snap.data() } as Message)
};
