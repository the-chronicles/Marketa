// import { auth } from '@/config/firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
// import { useEffect, useState } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'buyer' | 'seller' | 'rider';
//   verified: boolean;
// }

// // export function useUser() {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Simulate loading user data
// //     const timer = setTimeout(() => {
// //       setUser({
// //         id: '1',
// //         name: 'John Doe',
// //         email: 'john.doe@ui.edu.ng',
// //         role: 'buyer', // Default role, can be changed
// //         verified: true,
// //       });
// //       setLoading(false);
// //     }, 1000);

// //     return () => clearTimeout(timer);
// //   }, []);

// //   const login = (userData: User) => {
// //     setUser(userData);
// //   };

// //   const logout = () => {
// //     setUser(null);
// //   };

// //   const updateUserRole = (role: 'buyer' | 'seller' | 'rider') => {
// //     if (user) {
// //       setUser({ ...user, role });
// //     }
// //   };

// //   return {
// //     user,
// //     loading,
// //     login,
// //     logout,
// //     updateUserRole,
// //   };
// // }

// export function useUser() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       if (firebaseUser) {
//         setUser({
//           id: firebaseUser.uid,
//           name: firebaseUser.displayName || 'User',
//           // name: formData.name || 'User',
//           email: firebaseUser.email || '',
//           role: 'buyer', // fetch from Firestore if needed
//           verified: firebaseUser.emailVerified,
//         });
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const login = (userData: User) => setUser(userData);
//   const logout = () => auth.signOut().then(() => setUser(null));

//   const updateUserRole = (role: 'buyer' | 'seller' | 'rider') => {
//     if (user) setUser({ ...user, role });
//   };

//   return { user, loading, login, logout, updateUserRole };
// }


import { auth, db } from '@/config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'rider';
  verified: boolean;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser({
            id: firebaseUser.uid,
            name: userData.name || 'Unknown',
            email: firebaseUser.email || '',
            role: userData.role || 'buyer',
            verified: firebaseUser.emailVerified,
          });
        } else {
          // fallback if user doc not found
          setUser({
            id: firebaseUser.uid,
            name: 'Unknown',
            email: firebaseUser.email || '',
            role: 'buyer',
            verified: firebaseUser.emailVerified,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (userData: User) => setUser(userData);
  const logout = () => auth.signOut().then(() => setUser(null));
  const updateUserRole = (role: 'buyer' | 'seller' | 'rider') => {
    if (user) setUser({ ...user, role });
  };

  return { user, loading, login, logout, updateUserRole };
}
