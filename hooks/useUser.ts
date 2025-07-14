import { useState, useEffect } from 'react';

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
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john.doe@ui.edu.ng',
        role: 'buyer', // Default role, can be changed
        verified: true,
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserRole = (role: 'buyer' | 'seller' | 'rider') => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    updateUserRole,
  };
}