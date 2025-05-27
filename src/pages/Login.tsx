
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
      await login(email, password);
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
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
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
            <p className="text-xs text-gray-600 mb-2">Cuentas de prueba:</p>
            <p className="text-xs">Proveedor: proveedor@test.com</p>
            <p className="text-xs">Comerciante: comerciante@test.com</p>
            <p className="text-xs">Contraseña: cualquiera</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
