
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleProtectedRoute = (route: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Acceso restringido",
        description: "Debes iniciar sesión para acceder a esta función",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    navigate(route);
  };

  const navItems = [
    {
      id: 'home',
      label: 'Inicio',
      icon: '🏠',
      path: '/',
      protected: false
    },
    {
      id: 'categories',
      label: 'Categorías',
      icon: '🗂️',
      path: '/categories',
      protected: false
    },
    {
      id: 'publish',
      label: 'Publicar',
      icon: '➕',
      path: '/publish',
      protected: true
    },
    {
      id: 'messages',
      label: 'Mensajes',
      icon: '💬',
      path: '/messages',
      protected: true
    },
    {
      id: 'profile',
      label: 'Mi Cuenta',
      icon: '👤',
      path: '/profile',
      protected: true
    }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.protected) {
      handleProtectedRoute(item.path);
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navbar-600 text-white shadow-lg z-50">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center justify-center p-2 min-w-[60px] rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-navbar-700 text-white scale-105' 
                  : 'text-red-100 hover:bg-navbar-700/50'
              }`}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="text-xs font-medium leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
