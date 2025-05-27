
import { useState, useEffect } from 'react';

const banners = [
  {
    id: 1,
    title: "Ofertas Especiales B2B",
    subtitle: "Descuentos de hasta 30% en compras al por mayor",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800",
    color: "from-blue-500 to-blue-700"
  },
  {
    id: 2,
    title: "Nuevos Proveedores",
    subtitle: "Encuentra los mejores productos para tu negocio",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    color: "from-green-500 to-green-700"
  },
  {
    id: 3,
    title: "Logística Nacional",
    subtitle: "Envíos rápidos y seguros a todo el país",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    color: "from-orange-500 to-orange-700"
  }
];

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const banner = banners[currentBanner];

  return (
    <div className="relative overflow-hidden rounded-lg mx-4 mt-4 h-40">
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-90`}
      />
      <img
        src={banner.image}
        alt={banner.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col justify-center h-full p-6 text-white">
        <h2 className="text-xl font-bold mb-1">{banner.title}</h2>
        <p className="text-sm opacity-90">{banner.subtitle}</p>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentBanner ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
