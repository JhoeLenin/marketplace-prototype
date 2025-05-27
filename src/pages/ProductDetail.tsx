
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    id: id || '1',
    name: 'Laptop HP Pavilion 15" - Ideal para oficinas corporativas y trabajo remoto',
    price: 2500,
    unit: 'unidad',
    minOrder: 10,
    stock: 150,
    deliveryTime: '5-7 días hábiles',
    description: 'Laptop empresarial de alta calidad con procesador Intel Core i5, 8GB RAM, disco SSD 256GB. Ideal para oficinas, trabajo remoto y uso empresarial. Incluye Windows 11 Pro y garantía de 2 años.',
    images: [
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600'
    ],
    supplier: {
      name: 'TechDistribuidora SAC',
      rating: 4.8,
      location: 'Lima, Perú',
      description: 'Distribuidor autorizado de equipos tecnológicos con más de 10 años de experiencia',
      totalProducts: 234,
      responseTime: '2 horas promedio'
    },
    specifications: [
      'Procesador Intel Core i5-11400H',
      'Memoria RAM 8GB DDR4',
      'Almacenamiento SSD 256GB',
      'Pantalla 15.6" Full HD',
      'Tarjeta gráfica integrada',
      'Windows 11 Pro'
    ]
  };

  const handleProtectedAction = (action: string, callback: () => void) => {
    if (!isAuthenticated) {
      toast({
        title: "Acceso restringido",
        description: `Debes iniciar sesión para ${action}`,
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    callback();
  };

  const handleFavorite = () => {
    handleProtectedAction("agregar a favoritos", () => {
      setIsFavorite(!isFavorite);
      toast({
        title: isFavorite ? "Removido de favoritos" : "Agregado a favoritos",
        description: `${product.name} ${isFavorite ? 'removido de' : 'agregado a'} tus favoritos`,
      });
    });
  };

  const handleContact = () => {
    handleProtectedAction("contactar proveedor", () => {
      navigate(`/messages/new?supplier=${product.supplier.name}`);
    });
  };

  const handleQuote = () => {
    handleProtectedAction("solicitar cotización", () => {
      toast({
        title: "Cotización solicitada",
        description: "El proveedor recibirá tu solicitud de cotización",
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          ← Volver
        </Button>
        <h1 className="ml-4 font-semibold text-gray-900 truncate">Detalle del Producto</h1>
      </div>

      {/* Image Gallery */}
      <div className="bg-white">
        <div className="relative">
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name}
            className="w-full h-80 object-cover"
          />
          <button
            onClick={handleFavorite}
            className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        
        {product.images.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  index === currentImageIndex ? 'border-primary-400' : 'border-gray-200'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <h1 className="text-xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-bold text-primary-700">
                  S/ {product.price.toLocaleString()}
                </span>
                <span className="text-gray-600 ml-2">por {product.unit}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Stock disponible</p>
                <p className="font-semibold text-green-600">{product.stock} unidades</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-gray-600">Mínimo de compra:</span>
                <p className="font-semibold">{product.minOrder} {product.unit}</p>
              </div>
              <div>
                <span className="text-gray-600">Tiempo de entrega:</span>
                <p className="font-semibold">{product.deliveryTime}</p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Especificaciones</h3>
              <ul className="space-y-1">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Supplier Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Información del Proveedor</h3>
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-primary-700">{product.supplier.name}</h4>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="text-sm font-medium">{product.supplier.rating}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.supplier.totalProducts} productos)
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{product.supplier.location}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/supplier/${product.supplier.name}`)}
                className="border-primary-300 text-primary-700"
              >
                Ver Perfil
              </Button>
            </div>

            <p className="text-sm text-gray-700 mb-3">{product.supplier.description}</p>
            
            <div className="text-sm text-gray-600">
              <span className="font-medium">Tiempo de respuesta:</span> {product.supplier.responseTime}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-navbar-600 hover:bg-navbar-700 text-white py-3"
            onClick={handleQuote}
          >
            💬 Solicitar Cotización
          </Button>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 border-primary-300 text-primary-700 hover:bg-primary-50"
              onClick={handleContact}
            >
              📞 Contactar
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-primary-300 text-primary-700 hover:bg-primary-50"
              onClick={() => navigate('/messages')}
            >
              💬 Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
