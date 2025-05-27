
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    try {
      const user = await login(email, password);
      toast({
        title: "¡Bienvenido!",
        description: `Has iniciado sesión como ${user.type}`,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error de acceso",
        description: "Credenciales incorrectas",
        variant: "destructive",
      });
    }
  };

  const quickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary-200">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🏢</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Iniciar Sesión</CardTitle>
          <p className="text-gray-600">Accede a tu cuenta B2B</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className="border-primary-300 focus:border-primary-500"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Contraseña (6 dígitos)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="123456"
                maxLength={6}
                pattern="[0-9]{6}"
                className="border-primary-300 focus:border-primary-500"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-navbar-600 hover:bg-navbar-700 text-white"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <Link 
              to="/forgot-password" 
              className="text-sm text-primary-700 hover:text-primary-800"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            
            <div className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link 
                to="/register" 
                className="text-navbar-600 hover:text-navbar-700 font-medium"
              >
                Regístrate aquí
              </Link>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-3 font-semibold">Cuentas de prueba:</p>
            
            <div className="space-y-2">
              <button
                onClick={() => quickLogin('admin@sistema.com', '123456')}
                className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50"
              >
                <p className="text-xs font-medium text-purple-700">👨‍💼 Administrador</p>
                <p className="text-xs">admin@sistema.com - 123456</p>
              </button>
              
              <button
                onClick={() => quickLogin('comerciante@test.com', '654321')}
                className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50"
              >
                <p className="text-xs font-medium text-blue-700">🏢 Comerciante</p>
                <p className="text-xs">comerciante@test.com - 654321</p>
              </button>
              
              <button
                onClick={() => quickLogin('proveedor@test.com', '789012')}
                className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50"
              >
                <p className="text-xs font-medium text-green-700">🏭 Proveedor</p>
                <p className="text-xs">proveedor@test.com - 789012</p>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
