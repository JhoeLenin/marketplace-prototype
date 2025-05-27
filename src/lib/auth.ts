
export interface User {
  id: string;
  name: string;
  email: string;
  type: 'comerciante' | 'proveedor';
  company: string;
  ruc?: string;
  phone?: string;
  avatar?: string;
  rating?: number;
  location?: string;
}

class AuthService {
  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  constructor() {
    // Load user from localStorage on initialization
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  subscribe(callback: (user: User | null) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.currentUser));
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in real app this would come from backend
    const mockUser: User = {
      id: '1',
      name: email === 'proveedor@test.com' ? 'Juan Pérez' : 'María García',
      email,
      type: email === 'proveedor@test.com' ? 'proveedor' : 'comerciante',
      company: email === 'proveedor@test.com' ? 'Distribuidora ABC' : 'Tienda XYZ',
      ruc: '20123456789',
      phone: '+51987654321',
      rating: 4.5,
      location: 'Lima, Perú'
    };

    this.currentUser = mockUser;
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    this.notify();
    return mockUser;
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    company: string;
    ruc: string;
    type: 'comerciante' | 'proveedor';
    phone?: string;
  }): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      type: userData.type,
      company: userData.company,
      ruc: userData.ruc,
      phone: userData.phone,
      rating: 0,
      location: 'Lima, Perú'
    };

    this.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    this.notify();
    return newUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.notify();
  }

  requireAuth(): boolean {
    return this.isAuthenticated();
  }
}

export const authService = new AuthService();
