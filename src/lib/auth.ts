
export interface User {
  id: string;
  name: string;
  email: string;
  type: 'administrador' | 'comerciante' | 'proveedor';
  company: string;
  ruc?: string;
  phone?: string;
  avatar?: string;
  rating?: number;
  location?: string;
}

// Usuarios predefinidos con contraseñas de 6 dígitos
const MOCK_USERS = [
  {
    email: 'admin@sistema.com',
    password: '123456',
    user: {
      id: 'admin-1',
      name: 'Ana Administradora',
      email: 'admin@sistema.com',
      type: 'administrador' as const,
      company: 'Sistema B2B',
      location: 'Lima, Perú'
    }
  },
  {
    email: 'comerciante@test.com',
    password: '654321',
    user: {
      id: 'comerciante-1',
      name: 'María García',
      email: 'comerciante@test.com',
      type: 'comerciante' as const,
      company: 'Tienda XYZ',
      ruc: '20123456789',
      phone: '+51987654321',
      rating: 4.2,
      location: 'Lima, Perú'
    }
  },
  {
    email: 'proveedor@test.com',
    password: '789012',
    user: {
      id: 'proveedor-1',
      name: 'Juan Pérez',
      email: 'proveedor@test.com',
      type: 'proveedor' as const,
      company: 'Distribuidora ABC',
      ruc: '20123456789',
      phone: '+51987654321',
      rating: 4.5,
      location: 'Lima, Perú'
    }
  }
];

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
    
    // Find user by email and password
    const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!mockUser) {
      throw new Error('Credenciales incorrectas');
    }

    this.currentUser = mockUser.user;
    localStorage.setItem('currentUser', JSON.stringify(mockUser.user));
    this.notify();
    return mockUser.user;
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
