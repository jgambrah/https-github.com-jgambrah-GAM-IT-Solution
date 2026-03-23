import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Zap, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { getGeminiStream, ModelType } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  model?: ModelType;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm the GAM IT Solutions AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [modelType, setModelType] = useState<ModelType>('pro');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    const initialAiMessage: Message = {
      id: aiMessageId,
      text: '',
      sender: 'ai',
      timestamp: new Date(),
      model: modelType,
    };

    setMessages((prev) => [...prev, initialAiMessage]);

    try {
      const stream = await getGeminiStream(input, modelType);
      let fullText = '';

      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text || '';
        fullText += textChunk;
        
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === aiMessageId ? { ...msg, text: fullText } : msg
          )
        );
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === aiMessageId 
            ? { ...msg, text: "I'm sorry, I encountered an error. Please try again." } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col mb-4 ${
              isMinimized ? 'w-72 h-14' : 'w-[350px] sm:w-[400px] h-[500px] sm:h-[600px]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">GAM AI Assistant</h3>
                  {!isMinimized && (
                    <p className="text-[10px] text-indigo-100 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Online
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Model Selector */}
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Response Mode</span>
                  <div className="flex bg-gray-200 p-0.5 rounded-lg">
                    <button
                      onClick={() => setModelType('pro')}
                      className={`flex items-center gap-1 px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                        modelType === 'pro' 
                          ? 'bg-white text-indigo-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Bot className="w-3 h-3" /> Standard
                    </button>
                    <button
                      onClick={() => setModelType('lite')}
                      className={`flex items-center gap-1 px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                        modelType === 'lite' 
                          ? 'bg-white text-amber-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Zap className="w-3 h-3" /> Fast
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                          msg.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                            : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
                        }`}
                      >
                        {msg.text || (isLoading && msg.sender === 'ai' ? (
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                        ) : null)}
                        <div className={`text-[9px] mt-1 opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {msg.model && ` • ${msg.model === 'pro' ? 'Standard' : 'Fast'}`}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask anything..."
                      className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className={`absolute right-2 p-2 rounded-xl transition-all ${
                        input.trim() && !isLoading
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-[9px] text-gray-400 mt-2 text-center">
                    Powered by Gemini AI • GAM IT Solutions
                  </p>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-white text-indigo-600 border border-gray-100' : 'bg-indigo-600 text-white'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default ChatBot;
