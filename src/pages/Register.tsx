
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    ruc: '',
    email: '',
    phone: '',
    password: '',
    type: 'comerciante' as 'comerciante' | 'proveedor'
  });
  
  const { register, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.company || !formData.ruc) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    try {
      await register(formData);
      toast({
        title: "¡Cuenta creada!",
        description: "Tu cuenta ha sido creada exitosamente",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la cuenta",
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
          <CardTitle className="text-2xl font-bold text-gray-900">Crear Cuenta</CardTitle>
          <p className="text-gray-600">Únete a nuestra plataforma B2B</p>
        </CardHeader>
        
        <CardContent>
          {/* Account Type Selector */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Tipo de Cuenta</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={formData.type === 'comerciante' ? 'default' : 'outline'}
                className={`flex-1 ${formData.type === 'comerciante' 
                  ? 'bg-navbar-600 hover:bg-navbar-700 text-white' 
                  : 'border-primary-300 text-primary-700 hover:bg-primary-50'
                }`}
                onClick={() => handleInputChange('type', 'comerciante')}
              >
                Comerciante
              </Button>
              <Button
                type="button"
                variant={formData.type === 'proveedor' ? 'default' : 'outline'}
                className={`flex-1 ${formData.type === 'proveedor' 
                  ? 'bg-navbar-600 hover:bg-navbar-700 text-white' 
                  : 'border-primary-300 text-primary-700 hover:bg-primary-50'
                }`}
                onClick={() => handleInputChange('type', 'proveedor')}
              >
                Proveedor
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="company">Nombre de Empresa *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Mi Empresa SAC"
                className="border-primary-300 focus:border-primary-500"
              />
            </div>

            <div>
              <Label htmlFor="name">Nombre del Representante *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Juan Pérez"
                className="border-primary-300 focus:border-primary-500"
              />
            </div>
            
            <div>
              <Label htmlFor="ruc">RUC / Documento *</Label>
              <Input
                id="ruc"
                value={formData.ruc}
                onChange={(e) => handleInputChange('ruc', e.target.value)}
                placeholder="20123456789"
                className="border-primary-300 focus:border-primary-500"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contacto@miempresa.com"
                className="border-primary-300 focus:border-primary-500"
              />
            </div>

            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+51 987 654 321"
                className="border-primary-300 focus:border-primary-500"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Contraseña *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                className="border-primary-300 focus:border-primary-500"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-navbar-600 hover:bg-navbar-700 text-white"
              disabled={loading}
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to="/login" 
                className="text-navbar-600 hover:text-navbar-700 font-medium"
              >
                Inicia sesión aquí
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
