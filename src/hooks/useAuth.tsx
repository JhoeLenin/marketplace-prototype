
import { useState, useEffect } from 'react';
import { authService, User } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.subscribe(setUser);
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await authService.login(email, password);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    company: string;
    ruc: string;
    type: 'comerciante' | 'proveedor';
    phone?: string;
  }) => {
    setLoading(true);
    try {
      const user = await authService.register(userData);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
  };

  const requireAuth = (): boolean => {
    return authService.requireAuth();
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    requireAuth,
    isAuthenticated: !!user
  };
}
