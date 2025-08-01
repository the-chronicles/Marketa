import { collection, getDocs } from 'firebase/firestore';
// import { db } from '@/firebase';
import { db } from '../config/firebaseConfig';

export async function fetchFeaturedFood() {
  const snapshot = await getDocs(collection(db, 'featuredFood'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function fetchCategories() {
  const snapshot = await getDocs(collection(db, 'categories'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function fetchQuickActions() {
  const snapshot = await getDocs(collection(db, 'quickActions'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
