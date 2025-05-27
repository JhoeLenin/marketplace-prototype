
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';

const categoriesData = [
  {
    id: 'alimentos',
    name: 'Alimentos y Bebidas',
    icon: '🥘',
    count: 1250,
    subcategories: [
      { id: 'cereales', name: 'Cereales y Granos', count: 234 },
      { id: 'lacteos', name: 'Lácteos', count: 189 },
      { id: 'carnes', name: 'Carnes y Embutidos', count: 156 },
      { id: 'bebidas', name: 'Bebidas', count: 298 },
      { id: 'conservas', name: 'Conservas', count: 167 },
      { id: 'panaderia', name: 'Panadería', count: 206 }
    ]
  },
  {
    id: 'textiles',
    name: 'Textiles y Confecciones',
    icon: '👕',
    count: 890,
    subcategories: [
      { id: 'uniformes', name: 'Uniformes Empresariales', count: 123 },
      { id: 'ropa-trabajo', name: 'Ropa de Trabajo', count: 198 },
      { id: 'telas', name: 'Telas por Metro', count: 234 },
      { id: 'accesorios', name: 'Accesorios', count: 89 },
      { id: 'calzado', name: 'Calzado Industrial', count: 156 },
      { id: 'bordados', name: 'Bordados y Estampados', count: 90 }
    ]
  },
  {
    id: 'tecnologia',
    name: 'Tecnología',
    icon: '💻',
    count: 654,
    subcategories: [
      { id: 'computadoras', name: 'Computadoras', count: 123 },
      { id: 'perifericos', name: 'Periféricos', count: 89 },
      { id: 'software', name: 'Software', count: 67 },
      { id: 'servidores', name: 'Servidores', count: 45 },
      { id: 'redes', name: 'Equipos de Red', count: 156 },
      { id: 'seguridad', name: 'Seguridad IT', count: 174 }
    ]
  },
  {
    id: 'construccion',
    name: 'Construcción',
    icon: '🏗️',
    count: 432,
    subcategories: [
      { id: 'cemento', name: 'Cemento y Mortero', count: 89 },
      { id: 'acero', name: 'Acero y Fierro', count: 123 },
      { id: 'madera', name: 'Madera', count: 67 },
      { id: 'herramientas', name: 'Herramientas', count: 98 },
      { id: 'pinturas', name: 'Pinturas', count: 55 }
    ]
  }
];

const Categories = () => {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    navigate(`/search?category=${categoryId}&subcategory=${subcategoryId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <SearchBar placeholder="Buscar en categorías..." />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Categorías</h1>
        
        <div className="space-y-3">
          {categoriesData.map((category) => (
            <div key={category.id} className="bg-white rounded-lg border border-primary-200 overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-primary-50 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} productos</p>
                  </div>
                </div>
                <span className={`text-primary-600 transform transition-transform ${
                  expandedCategory === category.id ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>
              
              {expandedCategory === category.id && (
                <div className="border-t border-primary-100 bg-primary-25">
                  {category.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => handleSubcategoryClick(category.id, subcategory.id)}
                      className="w-full p-3 pl-12 text-left hover:bg-primary-100 transition-colors border-b border-primary-50 last:border-b-0"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">{subcategory.name}</span>
                        <span className="text-sm text-gray-500">({subcategory.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
