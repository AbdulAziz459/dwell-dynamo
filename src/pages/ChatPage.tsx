
import { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send, 
  MessageSquare, 
  Home, 
  Building, 
  Tag, 
  MapPin, 
  Info 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { chatbotResponses } from '@/lib/data';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your DwellDynamo assistant. How can I help you with your property needs in Islamabad?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const response = processQuery(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  const processQuery = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    // Check for buying related queries
    if (lowercaseQuery.includes('how to buy') || lowercaseQuery.includes('buying process')) {
      return chatbotResponses.buying.process;
    } else if (lowercaseQuery.includes('buying tips') || lowercaseQuery.includes('tips for buying')) {
      return chatbotResponses.buying.tips;
    } else if (lowercaseQuery.includes('finance') || lowercaseQuery.includes('mortgage')) {
      return chatbotResponses.buying.finance;
    }
    
    // Check for renting related queries
    else if (lowercaseQuery.includes('how to rent') || lowercaseQuery.includes('renting process')) {
      return chatbotResponses.renting.process;
    } else if (lowercaseQuery.includes('renting tips') || lowercaseQuery.includes('tips for renting')) {
      return chatbotResponses.renting.tips;
    } else if (lowercaseQuery.includes('documents') || lowercaseQuery.includes('paperwork for rent')) {
      return chatbotResponses.renting.documents;
    }
    
    // Check for investment related queries
    else if (lowercaseQuery.includes('investment advice') || lowercaseQuery.includes('invest in property')) {
      return chatbotResponses.investment.advice;
    } else if (lowercaseQuery.includes('return on investment') || lowercaseQuery.includes('roi') || lowercaseQuery.includes('returns')) {
      return chatbotResponses.investment.returns;
    } else if (lowercaseQuery.includes('hotspot') || lowercaseQuery.includes('best area to invest')) {
      return chatbotResponses.investment.hotspots;
    }
    
    // Check for rate related queries
    else if (lowercaseQuery.includes('rates in f') || lowercaseQuery.includes('f sector')) {
      return chatbotResponses.rates["F-Sectors"];
    } else if (lowercaseQuery.includes('rates in e') || lowercaseQuery.includes('e sector')) {
      return chatbotResponses.rates["E-Sectors"];
    } else if (lowercaseQuery.includes('bahria') || lowercaseQuery.includes('rates in bahria')) {
      return chatbotResponses.rates["Bahria Town"];
    } else if (lowercaseQuery.includes('dha') || lowercaseQuery.includes('rates in dha')) {
      return chatbotResponses.rates["DHA"];
    }
    
    // Default response for unrecognized queries
    return "I'm not sure about that specific question. You can ask me about buying or renting processes, investment advice, or property rates in different areas of Islamabad like F Sectors, E Sectors, Bahria Town, or DHA.";
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const QuickQuestionButton = ({ text, onClick }: { text: string; onClick: () => void }) => (
    <Button 
      variant="outline" 
      size="sm" 
      className="text-xs h-auto py-1.5 px-3"
      onClick={onClick}
    >
      {text}
    </Button>
  );
  
  const addQuickQuestion = (question: string) => {
    setInputValue(question);
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="https://randomuser.me/api/portraits/women/22.jpg" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-medium">Property Assistant</h2>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                  AI Powered
                </Badge>
              </div>
              
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] lg:max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-teal-600 text-white rounded-tr-none' 
                          : 'bg-gray-100 dark:bg-gray-700 rounded-tl-none'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-line">{message.text}</div>
                      <div 
                        className={`text-xs mt-1 ${
                          message.sender === 'user' 
                            ? 'text-teal-100' 
                            : 'text-muted-foreground'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] lg:max-w-[70%] rounded-lg p-3 bg-gray-100 dark:bg-gray-700 rounded-tl-none">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your question here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  <QuickQuestionButton 
                    text="How to buy property?" 
                    onClick={() => addQuickQuestion("What is the process for buying a property in Islamabad?")}
                  />
                  <QuickQuestionButton 
                    text="Investment hotspots" 
                    onClick={() => addQuickQuestion("What are the current investment hotspots in Islamabad?")}
                  />
                  <QuickQuestionButton 
                    text="DHA rates" 
                    onClick={() => addQuickQuestion("What are the current property rates in DHA Islamabad?")}
                  />
                  <QuickQuestionButton 
                    text="Renting tips" 
                    onClick={() => addQuickQuestion("Can you give me some tips for renting a property?")}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Info className="h-5 w-5 text-teal-600 mr-3" />
                    <h3 className="font-heading font-medium text-lg">About the Assistant</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    This AI assistant can answer your questions about property buying, renting, investment, and market rates in Islamabad.
                  </p>
                  <Separator className="my-4" />
                  <h4 className="font-medium mb-2">You can ask about:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <Home className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                      <span>Buying and selling processes</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <Building className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                      <span>Renting properties and documentation</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <Tag className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                      <span>Property prices and investment returns</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <MapPin className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                      <span>Area-specific information in Islamabad</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="h-5 w-5 text-teal-600 mr-3" />
                    <h3 className="font-heading font-medium text-lg">Need More Help?</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    For more detailed assistance or to speak with a human agent, you can:
                  </p>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      Book a Consultation
                    </Button>
                    <Button variant="outline" className="w-full">
                      Call Us: +92 51 1234567
                    </Button>
                    <Button variant="outline" className="w-full">
                      Email: support@dwelldynamo.com
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
