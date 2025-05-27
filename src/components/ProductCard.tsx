
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  supplier: {
    name: string;
    rating: number;
    location: string;
  };
  minOrder?: number;
  isFavorite?: boolean;
}

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
}

const ProductCard = ({ product, showActions = true }: ProductCardProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

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

  const handleViewProfile = () => {
    handleProtectedAction("ver perfil del proveedor", () => {
      navigate(`/supplier/${product.supplier.name}`);
    });
  };

  return (
    <Card className="bg-white border border-primary-200 hover:shadow-lg transition-all duration-200 animate-fade-in">
      <CardContent className="p-0">
        <div 
          className="cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {showActions && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite();
                }}
                className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                  isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
                }`}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-primary-700">
                S/ {product.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">por {product.unit}</span>
            </div>

            {product.minOrder && (
              <p className="text-sm text-gray-600 mb-3">
                Mínimo: {product.minOrder} {product.unit}
              </p>
            )}

            <div className="border-t pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{product.supplier.name}</span>
                <div className="flex items-center">
                  <span className="text-sm text-yellow-500">⭐</span>
                  <span className="text-sm text-gray-600 ml-1">{product.supplier.rating}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">{product.supplier.location}</p>
            </div>
          </div>
        </div>

        {showActions && (
          <div className="px-4 pb-4 space-y-2">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-primary-300 text-primary-700 hover:bg-primary-50"
                onClick={handleViewProfile}
              >
                Ver Proveedor
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-navbar-600 hover:bg-navbar-700 text-white"
                onClick={handleContact}
              >
                Contactar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
