import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex items-start space-x-2 max-w-[80%] ${isBot ? 'bg-white' : 'bg-blue-500 text-white'} p-3 rounded-lg shadow`}>
        {isBot ? <Bot className="w-6 h-6 mt-1" /> : <User className="w-6 h-6 mt-1" />}
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;