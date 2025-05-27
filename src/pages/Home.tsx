
import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import Banner from '@/components/Banner';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';

const featuredProducts = [
  {
    id: '1',
    name: 'Laptop HP Pavilion 15" - Ideal para oficinas',
    price: 2500,
    unit: 'unidad',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
    supplier: {
      name: 'TechDistribuidora SAC',
      rating: 4.8,
      location: 'Lima, Perú'
    },
    minOrder: 10,
    isFavorite: false,
    category: 'tecnologia'
  },
  {
    id: '2',
    name: 'Camisetas Polo Empresariales - Pack x100',
    price: 15,
    unit: 'unidad',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    supplier: {
      name: 'Textiles Express SAC',
      rating: 4.5,
      location: 'Gamarra, Lima'
    },
    minOrder: 100,
    category: 'textiles'
  },
  {
    id: '11',
    name: 'Televisor Smart TV 55" 4K Ultra HD',
    price: 1899,
    unit: 'unidad',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    supplier: {
      name: 'ElectroMega Distribuidores',
      rating: 4.9,
      location: 'San Isidro, Lima'
    },
    minOrder: 5,
    isFavorite: true,
    category: 'tecnologia'
  },
  {
    id: '12',
    name: 'Uniformes Médicos - Set Completo',
    price: 85,
    unit: 'set',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    supplier: {
      name: 'Confecciones MediCare EIRL',
      rating: 4.7,
      location: 'Ate, Lima'
    },
    minOrder: 50,
    category: 'textiles'
  }
];

const newProducts = [
  {
    id: '3',
    name: 'Arroz Premium Grado A - Saco 50kg',
    price: 120,
    unit: 'saco',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    supplier: {
      name: 'Molinos del Sur EIRL',
      rating: 4.6,
      location: 'Arequipa, Perú'
    },
    minOrder: 50,
    isFavorite: true,
    category: 'alimentos'
  },
  {
    id: '4',
    name: 'Cemento Portland Tipo I - Bolsa 42.5kg',
    price: 28,
    unit: 'bolsa',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    supplier: {
      name: 'Constructora Materiales SA',
      rating: 4.7,
      location: 'Callao, Perú'
    },
    minOrder: 200,
    category: 'construccion'
  },
  {
    id: '13',
    name: 'Aceite de Cocina Premium - Bidon 20L',
    price: 95,
    unit: 'bidón',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    supplier: {
      name: 'Industrias Alimentarias del Norte',
      rating: 4.5,
      location: 'Trujillo, Perú'
    },
    minOrder: 25,
    category: 'alimentos'
  },
  {
    id: '14',
    name: 'Ladrillos King Kong - Millar',
    price: 450,
    unit: 'millar',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    supplier: {
      name: 'Ladrillera San Martín SAC',
      rating: 4.8,
      location: 'Huachipa, Lima'
    },
    minOrder: 10,
    category: 'construccion'
  },
  {
    id: '15',
    name: 'Smartphone Samsung Galaxy A54 128GB',
    price: 899,
    unit: 'unidad',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    supplier: {
      name: 'TechnoPlus Distribuciones',
      rating: 4.6,
      location: 'Miraflores, Lima'
    },
    minOrder: 20,
    category: 'tecnologia'
  },
  {
    id: '16',
    name: 'Pantalones Cargo de Trabajo - Pack x50',
    price: 35,
    unit: 'unidad',
    image: 'https://images.unsplash.com/photo-1542272454315-7ad9f1b1393e?w=400',
    supplier: {
      name: 'Confecciones Industriales Lima',
      rating: 4.4,
      location: 'Los Olivos, Lima'
    },
    minOrder: 50,
    category: 'textiles'
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <SearchBar />
      <Banner />
      <CategoryGrid />
      
      {/* Featured Products */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Productos Destacados</h2>
        <div className="space-y-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* New Products */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Nuevos Productos</h2>
        <div className="space-y-4">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
