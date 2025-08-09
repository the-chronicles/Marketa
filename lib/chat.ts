// lib/chat.ts
import { addDoc, collection, getDocs, limit, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';

export async function openOrCreateConversation(
  peerId: string,
  participantsMeta: Record<string, any>
) {
  const uid = auth.currentUser?.uid!;
  const memberIds = [uid, peerId].sort();

  // Try to find existing conversation
  const q = query(
    collection(db, 'conversations'),
    where('memberIds', '==', memberIds),
    limit(1)
  );
  const snap = await getDocs(q);
  if (!snap.empty) return snap.docs[0].id;

  // Create new conversation
  const docRef = await addDoc(collection(db, 'conversations'), {
    memberIds,
    participants: participantsMeta,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastReadAt: { [uid]: serverTimestamp() },
  });

  return docRef.id;
}
