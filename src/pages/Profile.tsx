import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    navigate('/');
  };

  const getUserIcon = () => {
    switch (user.type) {
      case 'administrador':
        return '👨‍💼';
      case 'comerciante':
        return '🏢';
      case 'proveedor':
        return '🏭';
      default:
        return '👤';
    }
  };

  const getUserColor = () => {
    switch (user.type) {
      case 'administrador':
        return 'text-purple-700';
      case 'comerciante':
        return 'text-blue-700';
      case 'proveedor':
        return 'text-green-700';
      default:
        return 'text-primary-700';
    }
  };

  // Mock data based on user type
  const mockOrders = [
    { id: '001', product: 'Laptop HP Pavilion', quantity: 15, status: 'Entregado', date: '2024-01-15' },
    { id: '002', product: 'Arroz Premium 50kg', quantity: 100, status: 'En tránsito', date: '2024-01-20' }
  ];

  const mockProducts = [
    { id: '1', name: 'Laptop HP Pavilion', views: 234, contacts: 12, status: 'Activo' },
    { id: '2', name: 'Arroz Premium', views: 189, contacts: 8, status: 'Pausado' }
  ];

  const renderAdminContent = () => (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="users">Usuarios</TabsTrigger>
        <TabsTrigger value="reports">Reportes</TabsTrigger>
        <TabsTrigger value="system">Sistema</TabsTrigger>
      </TabsList>

      <TabsContent value="users">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Gestión de Usuarios</h3>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-900">Usuarios Registrados</h4>
                <p className="text-sm text-gray-600">Total: 1,234 usuarios</p>
                <p className="text-sm text-gray-600">Comerciantes: 890 | Proveedores: 344</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reports">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Reportes del Sistema</h3>
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">📊</span>
              <p className="text-gray-600">Panel de reportes y estadísticas</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="system">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Configuración del Sistema</h3>
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">⚙️</span>
              <p className="text-gray-600">Configuraciones avanzadas del sistema</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );

  const renderComercianteContent = () => (
    <Tabs defaultValue="orders" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="orders">Mis Pedidos</TabsTrigger>
        <TabsTrigger value="favorites">Favoritos</TabsTrigger>
        <TabsTrigger value="ratings">Calificaciones</TabsTrigger>
      </TabsList>

      <TabsContent value="orders">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Mis Pedidos</h3>
            <div className="space-y-3">
              {mockOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">#{order.id}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Entregado' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{order.product}</p>
                  <p className="text-sm text-gray-600">Cantidad: {order.quantity}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="favorites">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Productos Favoritos</h3>
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">💝</span>
              <p className="text-gray-600">No tienes productos favoritos aún</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ratings">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Calificaciones Realizadas</h3>
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">⭐</span>
              <p className="text-gray-600">No hay calificaciones disponibles</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );

  const renderProveedorContent = () => (
    <Tabs defaultValue="products" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="products">Productos</TabsTrigger>
        <TabsTrigger value="orders">Pedidos</TabsTrigger>
        <TabsTrigger value="ratings">Calificaciones</TabsTrigger>
      </TabsList>

      <TabsContent value="products">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Mis Productos</h3>
              <Button 
                size="sm"
                onClick={() => navigate('/publish')}
                className="bg-primary-400 hover:bg-primary-500 text-primary-900"
              >
                + Nuevo
              </Button>
            </div>
            <div className="space-y-3">
              {mockProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.status === 'Activo' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>👁️ {product.views} vistas</span>
                    <span>💬 {product.contacts} contactos</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">Editar</Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      {product.status === 'Activo' ? 'Pausar' : 'Activar'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="orders">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Pedidos Recibidos</h3>
            <div className="space-y-3">
              {mockOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">#{order.id}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Entregado' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{order.product}</p>
                  <p className="text-sm text-gray-600">Cantidad: {order.quantity}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ratings">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Calificaciones Recibidas</h3>
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">⭐</span>
              <p className="text-gray-600">No hay calificaciones disponibles</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-900">Mi Perfil</h1>
      </div>

      {/* User Info Card */}
      <div className="p-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">{getUserIcon()}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className={`font-medium capitalize ${getUserColor()}`}>{user.type}</p>
                <p className="text-gray-600">{user.company}</p>
                <p className="text-sm text-gray-500">{user.location}</p>
                {user.rating && (
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    <span className="text-sm font-medium">{user.rating}</span>
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/profile/edit')}
                className="border-primary-300 text-primary-700"
              >
                ✏️ Editar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content based on user type */}
        {user.type === 'administrador' && renderAdminContent()}
        {user.type === 'comerciante' && renderComercianteContent()}
        {user.type === 'proveedor' && renderProveedorContent()}

        {/* Settings and Logout */}
        <div className="mt-6 space-y-3">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Configuración</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  👤 Editar Perfil
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  🔒 Cambiar Contraseña
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  🔔 Notificaciones
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  🌐 Idioma
                </Button>
              </div>
            </CardContent>
          </Card>

          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleLogout}
          >
            🚪 Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
