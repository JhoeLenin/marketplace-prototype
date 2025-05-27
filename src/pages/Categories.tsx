
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
      { id: 'cereales', name: 'Cereales y Granos', count: 234, products: ['Arroz Premium Grado A', 'Quinoa Orgánica', 'Avena Integral'] },
      { id: 'lacteos', name: 'Lácteos', count: 189, products: ['Leche Evaporada', 'Queso Fresco', 'Yogurt Natural'] },
      { id: 'carnes', name: 'Carnes y Embutidos', count: 156, products: ['Pollo Entero', 'Carne de Res', 'Jamón Serrano'] },
      { id: 'bebidas', name: 'Bebidas', count: 298, products: ['Agua Mineral', 'Jugo de Naranja', 'Gaseosa Cola'] },
      { id: 'conservas', name: 'Conservas', count: 167, products: ['Atún en Lata', 'Duraznos en Almíbar', 'Aceitunas Verdes'] },
      { id: 'panaderia', name: 'Panadería', count: 206, products: ['Pan Integral', 'Galletas de Avena', 'Bizcochos Dulces'] }
    ]
  },
  {
    id: 'textiles',
    name: 'Textiles y Confecciones',
    icon: '👕',
    count: 890,
    subcategories: [
      { id: 'uniformes', name: 'Uniformes Empresariales', count: 123, products: ['Camisetas Polo Empresariales', 'Chalecos Corporativos', 'Pantalones de Vestir'] },
      { id: 'ropa-trabajo', name: 'Ropa de Trabajo', count: 198, products: ['Overoles Industriales', 'Cascos de Seguridad', 'Botas de Trabajo'] },
      { id: 'telas', name: 'Telas por Metro', count: 234, products: ['Algodón 100%', 'Poliéster Reciclado', 'Lino Natural'] },
      { id: 'accesorios', name: 'Accesorios', count: 89, products: ['Cinturones de Cuero', 'Corbatas Corporativas', 'Pañuelos de Seda'] },
      { id: 'calzado', name: 'Calzado Industrial', count: 156, products: ['Zapatos de Seguridad', 'Botas Antideslizantes', 'Zapatillas Deportivas'] },
      { id: 'bordados', name: 'Bordados y Estampados', count: 90, products: ['Logos Bordados', 'Estampados Digitales', 'Parches Personalizados'] }
    ]
  },
  {
    id: 'tecnologia',
    name: 'Tecnología',
    icon: '💻',
    count: 654,
    subcategories: [
      { id: 'computadoras', name: 'Computadoras', count: 123, products: ['Laptop HP Pavilion 15"', 'PC Desktop Dell', 'MacBook Pro 13"'] },
      { id: 'perifericos', name: 'Periféricos', count: 89, products: ['Mouse Inalámbrico', 'Teclado Mecánico', 'Monitor LED 24"'] },
      { id: 'software', name: 'Software', count: 67, products: ['Microsoft Office', 'Antivirus Premium', 'Sistema de Gestión'] },
      { id: 'servidores', name: 'Servidores', count: 45, products: ['Servidor HP ProLiant', 'Rack de Red 42U', 'UPS 3000VA'] },
      { id: 'redes', name: 'Equipos de Red', count: 156, products: ['Router WiFi 6', 'Switch 24 Puertos', 'Access Point Empresarial'] },
      { id: 'seguridad', name: 'Seguridad IT', count: 174, products: ['Cámara IP 4K', 'Sistema de Alarma', 'Firewall Enterprise'] }
    ]
  },
  {
    id: 'construccion',
    name: 'Construcción',
    icon: '🏗️',
    count: 432,
    subcategories: [
      { id: 'cemento', name: 'Cemento y Mortero', count: 89, products: ['Cemento Portland Tipo I', 'Mortero Premezclado', 'Adhesivo Cerámico'] },
      { id: 'acero', name: 'Acero y Fierro', count: 123, products: ['Varillas de Acero 3/8"', 'Malla Electrosoldada', 'Perfiles de Acero'] },
      { id: 'madera', name: 'Madera', count: 67, products: ['Tablones de Pino', 'Triplay 18mm', 'Vigas de Eucalipto'] },
      { id: 'herramientas', name: 'Herramientas', count: 98, products: ['Taladro Percutor', 'Sierra Circular', 'Martillo Demoledor'] },
      { id: 'pinturas', name: 'Pinturas', count: 55, products: ['Pintura Látex Blanca', 'Esmalte Sintético', 'Barniz Marino'] }
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
