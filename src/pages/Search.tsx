
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockProductsByCategory = {
  'alimentos': [
    {
      id: '2',
      name: 'Arroz Premium Grado A - Saco 50kg',
      price: 120,
      unit: 'saco',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      supplier: { name: 'Molinos del Sur EIRL', rating: 4.6, location: 'Arequipa, Perú' },
      minOrder: 50
    },
    {
      id: '5',
      name: 'Quinoa Orgánica Premium - Bolsa 25kg',
      price: 180,
      unit: 'bolsa',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      supplier: { name: 'Granos Andinos SAC', rating: 4.8, location: 'Cusco, Perú' },
      minOrder: 20
    }
  ],
  'textiles': [
    {
      id: '3',
      name: 'Camisetas Polo Empresariales - Pack x100',
      price: 15,
      unit: 'unidad',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      supplier: { name: 'Textiles Express SAC', rating: 4.5, location: 'Gamarra, Lima' },
      minOrder: 100
    },
    {
      id: '6',
      name: 'Uniformes Corporativos - Set Completo',
      price: 85,
      unit: 'set',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      supplier: { name: 'Confecciones del Norte', rating: 4.3, location: 'Trujillo, Perú' },
      minOrder: 50
    }
  ],
  'tecnologia': [
    {
      id: '1',
      name: 'Laptop HP Pavilion 15" - Ideal para oficinas',
      price: 2500,
      unit: 'unidad',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
      supplier: { name: 'TechDistribuidora SAC', rating: 4.8, location: 'Lima, Perú' },
      minOrder: 10
    },
    {
      id: '7',
      name: 'Monitor LED 24" Full HD',
      price: 450,
      unit: 'unidad',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
      supplier: { name: 'Tech Solutions Peru', rating: 4.7, location: 'Lima, Perú' },
      minOrder: 5
    }
  ],
  'construccion': [
    {
      id: '4',
      name: 'Cemento Portland Tipo I - Bolsa 42.5kg',
      price: 28,
      unit: 'bolsa',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
      supplier: { name: 'Constructora Materiales SA', rating: 4.7, location: 'Callao, Perú' },
      minOrder: 200
    },
    {
      id: '8',
      name: 'Varillas de Acero 3/8" - Barra 9m',
      price: 35,
      unit: 'barra',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
      supplier: { name: 'Aceros del Pacífico', rating: 4.5, location: 'Lima, Perú' },
      minOrder: 100
    }
  ]
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    unit: '',
    region: '',
    productType: ''
  });

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';

  const getProducts = () => {
    if (category && mockProductsByCategory[category as keyof typeof mockProductsByCategory]) {
      return mockProductsByCategory[category as keyof typeof mockProductsByCategory];
    }
    return Object.values(mockProductsByCategory).flat().slice(0, 3);
  };

  const products = getProducts();

  const getPageTitle = () => {
    if (query) return `Resultados para "${query}"`;
    if (subcategory) return `Productos en ${subcategory}`;
    if (category) return `Categoría: ${category}`;
    return 'Búsqueda de productos';
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      unit: '',
      region: '',
      productType: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <SearchBar placeholder="Buscar productos..." />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">{getPageTitle()}</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="border-primary-300 text-primary-700"
          >
            🔍 Filtros
          </Button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg border border-primary-200 p-4 mb-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Filtros</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpiar
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minPrice">Precio mínimo</Label>
                <Input
                  id="minPrice"
                  placeholder="S/ 0"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="maxPrice">Precio máximo</Label>
                <Input
                  id="maxPrice"
                  placeholder="S/ 999"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Unidad de venta</Label>
              <Select value={filters.unit} onValueChange={(value) => handleFilterChange('unit', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unidad">Por unidad</SelectItem>
                  <SelectItem value="docena">Por docena</SelectItem>
                  <SelectItem value="caja">Por caja</SelectItem>
                  <SelectItem value="saco">Por saco</SelectItem>
                  <SelectItem value="kg">Por kilogramo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Región</Label>
              <Select value={filters.region} onValueChange={(value) => handleFilterChange('region', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar región" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lima">Lima</SelectItem>
                  <SelectItem value="arequipa">Arequipa</SelectItem>
                  <SelectItem value="trujillo">Trujillo</SelectItem>
                  <SelectItem value="cusco">Cusco</SelectItem>
                  <SelectItem value="chiclayo">Chiclayo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {products.length} productos encontrados
          </p>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600">Intenta ajustar los filtros o cambia los términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
