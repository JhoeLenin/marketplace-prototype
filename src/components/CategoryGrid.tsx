
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'alimentos', name: 'Alimentos', icon: '🥘', count: 1250 },
  { id: 'textiles', name: 'Textiles', icon: '👕', count: 890 },
  { id: 'tecnologia', name: 'Tecnología', icon: '💻', count: 654 },
  { id: 'construccion', name: 'Construcción', icon: '🏗️', count: 432 },
  { id: 'salud', name: 'Salud', icon: '🏥', count: 321 },
  { id: 'automotriz', name: 'Automotriz', icon: '🚗', count: 289 },
  { id: 'quimicos', name: 'Químicos', icon: '⚗️', count: 198 },
  { id: 'otros', name: 'Otros', icon: '📦', count: 567 }
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categorías Principales</h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => navigate(`/category/${category.id}`)}
            className="bg-white rounded-lg p-4 border border-primary-200 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{category.count} productos</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
