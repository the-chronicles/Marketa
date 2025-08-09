import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';
import { conversationConverter } from '@/types/chat';

export function useConversations() {
  const uid = auth.currentUser?.uid;
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<ReturnType<typeof mapWithUnread>>([]);

  useEffect(() => {
    if (!uid) return;
    const q = query(
      collection(db, 'conversations').withConverter(conversationConverter),
      where('memberIds', 'array-contains', uid),
      orderBy('updatedAt', 'desc')
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map(d => d.data());
      setConversations(mapWithUnread(list, uid));
      setLoading(false);
    });

    return unsub;
  }, [uid]);

  return { conversations, loading };
}

function mapWithUnread(convs: any[], uid: string) {
  return convs.map((c) => {
    const lastRead = c.lastReadAt?.[uid] as Timestamp | undefined;
    const hasUnread = c.lastMessage?.createdAt && (!lastRead || c.lastMessage.createdAt.toMillis() > lastRead.toMillis());
    return { ...c, unread: hasUnread ? 1 : 0 }; // simple badge; for true counts, compute per messages
  });
}
