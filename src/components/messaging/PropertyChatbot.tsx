
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatbotResponses } from '@/lib/data';
import { Send, Bot, Building, Home, User, HelpCircle, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const suggestedQueries = [
  { id: 'buying-process', text: 'How to buy property in Islamabad?', category: 'buying' },
  { id: 'buying-tips', text: 'What should I check before buying?', category: 'buying' },
  { id: 'buying-finance', text: 'How can I finance my property purchase?', category: 'buying' },
  { id: 'renting-process', text: 'Process for renting a property?', category: 'renting' },
  { id: 'renting-tips', text: 'Tips for first-time renters?', category: 'renting' },
  { id: 'renting-documents', text: 'Documents needed for renting?', category: 'renting' },
  { id: 'investment-advice', text: 'Best property investment areas?', category: 'investment' },
  { id: 'investment-returns', text: 'Expected returns on property investment?', category: 'investment' },
  { id: 'investment-hotspots', text: 'Current investment hotspots?', category: 'investment' },
  { id: 'rates-f-sectors', text: 'Property rates in F sectors?', category: 'rates' },
  { id: 'rates-e-sectors', text: 'Property rates in E sectors?', category: 'rates' },
  { id: 'rates-bahria', text: 'Property rates in Bahria Town?', category: 'rates' },
  { id: 'rates-dha', text: 'Property rates in DHA?', category: 'rates' },
];

const PropertyChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I\'m your property assistant. How can I help you today? You can ask me about buying, renting, investment advice, or property rates in Islamabad.',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (text: string = input) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Process query and get bot response
    setTimeout(() => {
      const response = generateResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };
  
  const generateResponse = (query: string): string => {
    // Convert query to lowercase for easier matching
    const lowercaseQuery = query.toLowerCase();
    
    // Check for property buying related queries
    if (lowercaseQuery.includes('buy') || lowercaseQuery.includes('buying') || lowercaseQuery.includes('purchase')) {
      if (lowercaseQuery.includes('process') || lowercaseQuery.includes('how to')) {
        return chatbotResponses.buying.process;
      } else if (lowercaseQuery.includes('tips') || lowercaseQuery.includes('check') || lowercaseQuery.includes('verify')) {
        return chatbotResponses.buying.tips;
      } else if (lowercaseQuery.includes('finance') || lowercaseQuery.includes('loan') || lowercaseQuery.includes('mortgage')) {
        return chatbotResponses.buying.finance;
      }
    }
    
    // Check for property renting related queries
    if (lowercaseQuery.includes('rent') || lowercaseQuery.includes('renting') || lowercaseQuery.includes('lease')) {
      if (lowercaseQuery.includes('process') || lowercaseQuery.includes('how to')) {
        return chatbotResponses.renting.process;
      } else if (lowercaseQuery.includes('tips') || lowercaseQuery.includes('advice')) {
        return chatbotResponses.renting.tips;
      } else if (lowercaseQuery.includes('document') || lowercaseQuery.includes('paper')) {
        return chatbotResponses.renting.documents;
      }
    }
    
    // Check for investment related queries
    if (lowercaseQuery.includes('invest') || lowercaseQuery.includes('return') || lowercaseQuery.includes('profit')) {
      if (lowercaseQuery.includes('advice') || lowercaseQuery.includes('should')) {
        return chatbotResponses.investment.advice;
      } else if (lowercaseQuery.includes('return') || lowercaseQuery.includes('profit') || lowercaseQuery.includes('yield')) {
        return chatbotResponses.investment.returns;
      } else if (lowercaseQuery.includes('hotspot') || lowercaseQuery.includes('area') || lowercaseQuery.includes('location')) {
        return chatbotResponses.investment.hotspots;
      }
    }
    
    // Check for rate related queries
    if (lowercaseQuery.includes('rate') || lowercaseQuery.includes('price') || lowercaseQuery.includes('cost')) {
      if (lowercaseQuery.includes('f-') || lowercaseQuery.includes('f sector')) {
        return chatbotResponses.rates["F-Sectors"];
      } else if (lowercaseQuery.includes('e-') || lowercaseQuery.includes('e sector')) {
        return chatbotResponses.rates["E-Sectors"];
      } else if (lowercaseQuery.includes('bahria')) {
        return chatbotResponses.rates["Bahria Town"];
      } else if (lowercaseQuery.includes('dha')) {
        return chatbotResponses.rates["DHA"];
      }
    }
    
    // Find a suggested query that matches
    const matchedQuery = suggestedQueries.find(
      q => lowercaseQuery.includes(q.text.toLowerCase()) || 
           q.id.toLowerCase().includes(lowercaseQuery.replace(/[^a-z0-9]/g, '-'))
    );
    
    if (matchedQuery) {
      const category = matchedQuery.category as keyof typeof chatbotResponses;
      const subCategory = matchedQuery.id.split('-')[1] as keyof (typeof chatbotResponses)[typeof category];
      
      if (chatbotResponses[category] && chatbotResponses[category][subCategory]) {
        return chatbotResponses[category][subCategory];
      }
    }
    
    // Default response
    return "I'm not sure about that. Could you try asking about buying, renting, investment advice, or property rates in Islamabad?";
  };
  
  const handleSuggestedQuery = (query: string) => {
    setInput(query);
    handleSendMessage(query);
  };
  
  return (
    <Card className="flex flex-col h-[calc(100vh-18rem)] shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Bot className="h-5 w-5 mr-2 text-primary" />
          Property Assistant
        </CardTitle>
      </CardHeader>
      
      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 mx-4">
          <TabsTrigger value="chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="topics">
            <HelpCircle className="h-4 w-4 mr-2" />
            Topics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="flex-1 flex flex-col m-0 p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <Avatar className={`h-8 w-8 ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                      {message.sender === 'user' ? (
                        <AvatarImage src="https://github.com/shadcn.png" />
                      ) : (
                        <AvatarImage src="/placeholder.svg" />
                      )}
                      <AvatarFallback>
                        {message.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 block mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={() => handleSendMessage()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSuggestedQuery("How to buy property in Islamabad?")}
              >
                Buying Process
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSuggestedQuery("Best property investment areas?")}
              >
                Investment Areas
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSuggestedQuery("Property rates in F sectors?")}
              >
                F-Sector Rates
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="topics" className="flex-1 m-0 p-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-3">
                  <Home className="h-5 w-5 mr-2 text-primary" />
                  Buying Property
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQueries
                    .filter((q) => q.category === 'buying')
                    .map((query) => (
                      <Button
                        key={query.id}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3"
                        onClick={() => handleSuggestedQuery(query.text)}
                      >
                        {query.text}
                      </Button>
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-3">
                  <Home className="h-5 w-5 mr-2 text-primary" />
                  Renting Property
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQueries
                    .filter((q) => q.category === 'renting')
                    .map((query) => (
                      <Button
                        key={query.id}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3"
                        onClick={() => handleSuggestedQuery(query.text)}
                      >
                        {query.text}
                      </Button>
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-3">
                  <Building className="h-5 w-5 mr-2 text-primary" />
                  Investment Advice
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQueries
                    .filter((q) => q.category === 'investment')
                    .map((query) => (
                      <Button
                        key={query.id}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3"
                        onClick={() => handleSuggestedQuery(query.text)}
                      >
                        {query.text}
                      </Button>
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-3">
                  <Building className="h-5 w-5 mr-2 text-primary" />
                  Property Rates
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQueries
                    .filter((q) => q.category === 'rates')
                    .map((query) => (
                      <Button
                        key={query.id}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3"
                        onClick={() => handleSuggestedQuery(query.text)}
                      >
                        {query.text}
                      </Button>
                    ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default PropertyChatbot;
