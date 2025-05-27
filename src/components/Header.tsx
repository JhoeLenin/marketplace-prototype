
const Header = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="flex items-center justify-center">
        <img 
          src="/lovable-uploads/72d70cb3-fe98-4602-8afc-b27d0fd95599.png" 
          alt="Provilink Logo" 
          className="w-8 h-8 mr-3"
        />
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">Provilink</h1>
          <p className="text-xs text-gray-600">Donde compras mejor</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
