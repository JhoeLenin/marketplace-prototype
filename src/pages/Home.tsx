
import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import Banner from '@/components/Banner';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';

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
    isFavorite: false
  },
  {
    id: '2',
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
    isFavorite: true
  }
];

const newProducts = [
  {
    id: '3',
    name: 'Camisetas Polo Empresariales - Pack x100',
    price: 15,
    unit: 'unidad',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    supplier: {
      name: 'Textiles Express SAC',
      rating: 4.5,
      location: 'Gamarra, Lima'
    },
    minOrder: 100
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
    minOrder: 200
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
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
