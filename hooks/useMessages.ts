import { useCallback, useEffect, useRef, useState } from 'react';
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';
import { messageConverter } from '@/types/chat';

export function useMessages(conversationId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [sending, setSending] = useState(false);
  const uid = auth.currentUser?.uid!;
  const firstLoad = useRef(true);

  useEffect(() => {
    const q = query(
      collection(db, 'conversations', conversationId, 'messages').withConverter(messageConverter),
      orderBy('createdAt', 'asc'),
      limit(100)
    );
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map(d => d.data());
      setMessages(list);
    });
    return unsub;
  }, [conversationId]);

  // Mark as read by bumping lastReadAt[uid]
  useEffect(() => {
    if (!uid || !conversationId) return;
    // on first visible load, mark read
    if (firstLoad.current) {
      firstLoad.current = false;
      const convRef = doc(db, 'conversations', conversationId);
      updateDoc(convRef, { [`lastReadAt.${uid}`]: serverTimestamp(), updatedAt: serverTimestamp() }).catch(() => {});
    }
  }, [conversationId, uid]);

  const send = useCallback(async (text: string) => {
    if (!text.trim()) return;
    setSending(true);
    const ref = collection(db, 'conversations', conversationId, 'messages');
    const payload = { text, senderId: uid, createdAt: serverTimestamp() };
    await addDoc(ref, payload);
    const convRef = doc(db, 'conversations', conversationId);
    await updateDoc(convRef, {
      lastMessage: payload,
      updatedAt: serverTimestamp(),
    });
    setSending(false);
  }, [conversationId, uid]);

  return { messages, send, sending };
}
