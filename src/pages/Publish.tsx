
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const Publish = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: '',
    minOrder: '',
    stock: '',
    deliveryTime: '',
    category: '',
    description: '',
    images: [] as string[]
  });

  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (user.type !== 'proveedor') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">🚫</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Acceso Restringido</h2>
            <p className="text-gray-600 mb-4">Solo los proveedores pueden publicar productos</p>
            <Button onClick={() => navigate('/')} className="bg-primary-400 hover:bg-primary-500 text-primary-900">
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you would upload these to a server
      // For now, we'll just simulate with placeholder URLs
      const newImages = Array.from(files).map((file, index) => 
        `https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&${index}`
      );
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages].slice(0, 5) }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.unit || !formData.category || !formData.description) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "¡Producto publicado!",
        description: "Tu producto ha sido publicado exitosamente",
      });
      
      navigate('/profile');
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo publicar el producto",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          ← Volver
        </Button>
        <h1 className="ml-4 text-xl font-bold text-gray-900">Publicar Producto</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Images */}
        <Card>
          <CardContent className="p-4">
            <Label className="text-base font-semibold text-gray-900 mb-3 block">Fotos del Producto *</Label>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Producto ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              {formData.images.length < 5 && (
                <label className="w-full h-32 border-2 border-dashed border-primary-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-400">
                  <span className="text-2xl text-primary-400 mb-1">📷</span>
                  <span className="text-sm text-primary-600">Agregar foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            <p className="text-xs text-gray-500">Máximo 5 fotos. Formatos: JPG, PNG</p>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <Label htmlFor="name">Nombre del Producto *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ej: Laptop HP Pavilion 15"
                className="border-primary-300 focus:border-primary-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Precio por Unidad *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0.00"
                  className="border-primary-300 focus:border-primary-500"
                />
              </div>
              <div>
                <Label htmlFor="unit">Unidad de Venta *</Label>
                <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unidad">Unidad</SelectItem>
                    <SelectItem value="docena">Docena</SelectItem>
                    <SelectItem value="caja">Caja</SelectItem>
                    <SelectItem value="saco">Saco</SelectItem>
                    <SelectItem value="kg">Kilogramo</SelectItem>
                    <SelectItem value="metro">Metro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minOrder">Mínimo de Compra</Label>
                <Input
                  id="minOrder"
                  type="number"
                  value={formData.minOrder}
                  onChange={(e) => handleInputChange('minOrder', e.target.value)}
                  placeholder="1"
                  className="border-primary-300 focus:border-primary-500"
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock Disponible</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', e.target.value)}
                  placeholder="100"
                  className="border-primary-300 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Categoría *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alimentos">Alimentos y Bebidas</SelectItem>
                  <SelectItem value="textiles">Textiles y Confecciones</SelectItem>
                  <SelectItem value="tecnologia">Tecnología</SelectItem>
                  <SelectItem value="construccion">Construcción</SelectItem>
                  <SelectItem value="salud">Salud y Belleza</SelectItem>
                  <SelectItem value="automotriz">Automotriz</SelectItem>
                  <SelectItem value="quimicos">Químicos</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="deliveryTime">Tiempo de Entrega</Label>
              <Input
                id="deliveryTime"
                value={formData.deliveryTime}
                onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                placeholder="Ej: 5-7 días hábiles"
                className="border-primary-300 focus:border-primary-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardContent className="p-4">
            <Label htmlFor="description">Descripción Detallada *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe tu producto, características, beneficios, especificaciones técnicas..."
              rows={6}
              className="border-primary-300 focus:border-primary-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">Incluye todas las características importantes</p>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-navbar-600 hover:bg-navbar-700 text-white py-3 text-lg font-semibold"
        >
          {loading ? (
            <>
              <span className="mr-2">⏳</span>
              Publicando...
            </>
          ) : (
            <>
              <span className="mr-2">🚀</span>
              Publicar Producto
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Publish;
