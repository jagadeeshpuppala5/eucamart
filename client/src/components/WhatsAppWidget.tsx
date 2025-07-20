
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppWidget = () => {
  return (
    <a
      href="https://wa.me/919014358988?text=Hello,+I+have+a+question+about+EucaMart"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
      title="Chat with Us Now"
    >
      <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
      <div className="absolute -top-12 -left-8 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with Us Now
      </div>
    </a>
  );
};

export default WhatsAppWidget;
