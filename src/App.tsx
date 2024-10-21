import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import { Message } from './types';
import { GoogleGenerativeAI } from "@google/generative-ai";

// import { generateResponse } from './api';

function App() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  //const API_KEY = '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';
  //Gemini
  const API_KEY = 'AIzaSyCXWf9jW0U0fi4sUjsHRR6y-jtHHDVlOUM'; 


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { type: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
    //   const response = await processMessageToChatGPT(input);
      const response = await processMessageToGemini(input);
      const botMessage: Message = { type: 'bot', content: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async () => {
  //   const newMessage = {
  //     input,
  //     direction: 'outgoing',
  //     sender: "user",
  //   };

  //   setMessages((prevMessages) => [...prevMessages, newMessage]);

  //   try {
  //     const response = await processMessageToChatGPT([...messages, newMessage]);
  //     const content = response.choices[0]?.message?.content;
  //     if (content) {
  //       const chatGPTResponse = {
  //         message: content,
  //         sender: "ChatGPT",
  //       };
  //       setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
  //     }
  //   } catch (error) {
  //     console.error("Error processing message:", error);
  //   } finally {
  //   }
  // };

  async function processMessageToGemini(input : string) 
  {
	const genAI = new GoogleGenerativeAI(API_KEY);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
	const result = await model.generateContent(input);  
	return result.response.text();
  }

  async function processMessageToChatGPT(userInput: string): Promise<string> {
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        { role: "user", content: userInput },
      ],
    };
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });
  
    const responseData = await response.json();
    
    // Extracting the message content from the API response
    const assistantMessage = responseData.choices[0].message.content;
  
    return assistantMessage;
  }
  

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Bot className="mr-2" /> AI Chatbot
          </h1>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center text-gray-500">
                <Bot className="mr-2" /> AI is thinking...
              </div>
            )}
            {error && (
              <div className="flex items-center text-red-500">
                <AlertCircle className="mr-2" /> {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 border rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white rounded-r-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;