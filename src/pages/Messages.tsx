
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const Messages = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const supplierParam = searchParams.get('supplier');

  if (!user) {
    navigate('/login');
    return null;
  }

  const mockChats = [
    {
      id: '1',
      contact: 'TechDistribuidora SAC',
      lastMessage: 'Perfecto, confirmamos la cotización',
      time: '10:30',
      unread: 2,
      avatar: '💻'
    },
    {
      id: '2',
      contact: 'Molinos del Sur EIRL',
      lastMessage: 'El arroz está disponible en stock',
      time: '09:15',
      unread: 0,
      avatar: '🌾'
    }
  ];

  const mockMessages = [
    { id: '1', sender: 'TechDistribuidora SAC', message: 'Hola, gracias por tu interés en nuestros productos', time: '10:00', isOwn: false },
    { id: '2', sender: 'Yo', message: '¿Cuál es el precio para 50 unidades?', time: '10:15', isOwn: true },
    { id: '3', sender: 'TechDistribuidora SAC', message: 'Para 50 unidades el precio es S/ 2,400 c/u. Incluye garantía de 2 años', time: '10:25', isOwn: false },
    { id: '4', sender: 'Yo', message: 'Perfecto, confirmamos la cotización', time: '10:30', isOwn: true }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  // If coming from a supplier link, show new chat interface
  if (supplierParam) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white shadow-sm p-4 flex items-center">
          <Button variant="ghost" size="sm" onClick={() => navigate('/messages')}>
            ← Volver
          </Button>
          <h1 className="ml-4 font-semibold text-gray-900">Nuevo Chat</h1>
        </div>

        <div className="p-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">💻</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{supplierParam}</h3>
                  <p className="text-sm text-green-600">En línea</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-700">
                  Inicia una conversación con este proveedor. Puedes preguntar sobre productos, precios, disponibilidad y condiciones de venta.
                </p>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Escribe tu mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-navbar-600 hover:bg-navbar-700 text-white"
                >
                  📤
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-900">Mensajes</h1>
      </div>

      {!selectedChat ? (
        // Chat list view
        <div className="p-4">
          <div className="space-y-2">
            {mockChats.map((chat) => (
              <Card key={chat.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent 
                  className="p-4"
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xl">{chat.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{chat.contact}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-navbar-600 rounded-full flex items-center justify-center ml-2">
                        <span className="text-xs text-white font-bold">{chat.unread}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {mockChats.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tienes conversaciones</h3>
              <p className="text-gray-600 mb-4">Comienza contactando proveedores desde los productos</p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-primary-400 hover:bg-primary-500 text-primary-900"
              >
                Explorar Productos
              </Button>
            </div>
          )}
        </div>
      ) : (
        // Chat conversation view
        <div className="flex flex-col h-screen">
          {/* Chat header */}
          <div className="bg-white border-b p-4 flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setSelectedChat(null)}>
              ← Volver
            </Button>
            <div className="ml-4 flex items-center">
              <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-lg">💻</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">TechDistribuidora SAC</h3>
                <p className="text-xs text-green-600">En línea</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {mockMessages.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isOwn 
                    ? 'bg-navbar-600 text-white' 
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${message.isOwn ? 'text-red-100' : 'text-gray-500'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="bg-white border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">📎</Button>
              <Input
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-navbar-600 hover:bg-navbar-700 text-white"
              >
                📤
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
