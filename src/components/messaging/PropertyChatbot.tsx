import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatbotResponses } from '@/lib/data';
import { Send, Bot, Home, User, HelpCircle, MessageSquare, Building, MapPin, BarChart, Loader2 } from 'lucide-react';
import { Message, SuggestedQuery } from '@/lib/types';
import { generateAIResponse } from '@/lib/openai';
import { AssistantLogo } from '@/components/ui/assistant-logo';
import { toast } from '@/hooks/use-toast';
import { generateLocalResponse } from '@/lib/localChatbot';

const suggestedQueries: SuggestedQuery[] = [
  // Buying category
  { id: 'buying-process', text: 'How to buy property in Islamabad?', category: 'buying' },
  { id: 'buying-tips', text: 'What should I check before buying?', category: 'buying' },
  { id: 'buying-finance', text: 'How can I finance my property purchase?', category: 'buying' },
  { id: 'buying-documents', text: 'What documents are needed for property purchase?', category: 'buying' },
  { id: 'buying-inspection', text: 'How to inspect property before buying?', category: 'buying' },
  { id: 'buying-negotiation', text: 'Tips for negotiating property price?', category: 'buying' },
  
  // Renting category
  { id: 'renting-process', text: 'Process for renting a property?', category: 'renting' },
  { id: 'renting-tips', text: 'Tips for first-time renters?', category: 'renting' },
  { id: 'renting-documents', text: 'Documents needed for renting?', category: 'renting' },
  { id: 'renting-inspection', text: 'What to check before renting a property?', category: 'renting' },
  { id: 'renting-agreement', text: 'How to draft a rental agreement?', category: 'renting' },
  { id: 'renting-deposit', text: 'Standard security deposit amounts?', category: 'renting' },
  
  // Investment category
  { id: 'investment-advice', text: 'Best property investment areas?', category: 'investment' },
  { id: 'investment-returns', text: 'Expected returns on property investment?', category: 'investment' },
  { id: 'investment-hotspots', text: 'Current investment hotspots?', category: 'investment' },
  { id: 'investment-commercial', text: 'Commercial vs residential investment?', category: 'investment' },
  { id: 'investment-risks', text: 'Risks in real estate investment?', category: 'investment' },
  { id: 'investment-appreciation', text: 'Areas with highest appreciation?', category: 'investment' },
  
  // Property rates category
  { id: 'rates-f-sectors', text: 'Property rates in F sectors?', category: 'rates' },
  { id: 'rates-e-sectors', text: 'Property rates in E sectors?', category: 'rates' },
  { id: 'rates-bahria', text: 'Property rates in Bahria Town?', category: 'rates' },
  { id: 'rates-dha', text: 'Property rates in DHA?', category: 'rates' },
  { id: 'rates-gulberg', text: 'Property rates in Gulberg?', category: 'rates' },
  { id: 'rates-bani-gala', text: 'Property rates in Bani Gala?', category: 'rates' },
  { id: 'rates-g-sectors', text: 'Property rates in G sectors?', category: 'rates' },
  { id: 'rates-i-sectors', text: 'Property rates in I sectors?', category: 'rates' },
  
  // Market trends
  { id: 'trends-current', text: 'Current real estate market trends?', category: 'trends' },
  { id: 'trends-forecast', text: 'Real estate market forecast?', category: 'trends' },
  { id: 'trends-investment', text: 'Best time to invest in property?', category: 'trends' },
  { id: 'trends-areas', text: 'Up-and-coming areas in Islamabad?', category: 'trends' },
];

const PropertyChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I\'m your property assistant powered by AI. How can I help you today? You can ask me about buying, renting, investment advice, or property rates in Islamabad.',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async (text: string = input) => {
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
    setIsLoading(true);
    
    try {
      // Get response from OpenAI API
      const response = await generateAIResponse(text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      toast({
        title: "Connection Error",
        description: "Could not generate a response. Using local data instead.",
        variant: "destructive",
      });
      
      // Fallback to local response system
      const fallbackResponse = generateLocalResponse(text, chatbotResponses);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: fallbackResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestedQuery = (query: string) => {
    setInput(query);
    handleSendMessage(query);
  };
  
  return (
    <Card className="shadow-md border-gray-800 bg-gray-900 text-white">
      <CardHeader className="pb-2 pt-4 px-4 border-b border-gray-800">
        <CardTitle className="flex items-center text-lg text-white">
          <AssistantLogo size={20} className="mr-2" />
          Property Assistant
        </CardTitle>
      </CardHeader>
      
      <Tabs defaultValue="chat" className="flex flex-col h-[520px]">
        <TabsList className="grid grid-cols-2 mx-4 mb-2 bg-gray-800">
          <TabsTrigger value="chat" className="flex items-center data-[state=active]:bg-gray-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="topics" className="flex items-center data-[state=active]:bg-gray-700">
            <HelpCircle className="h-4 w-4 mr-2" />
            Topics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="flex-1 flex flex-col m-0 p-0 h-full overflow-hidden">
          <ScrollArea className="flex-1 p-4 bg-gray-950">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex max-w-[85%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <Avatar className={`h-8 w-8 ${message.sender === 'user' ? 'ml-2' : 'mr-2'} bg-gray-800`}>
                      {message.sender === 'user' ? (
                        <AvatarImage src="/placeholder.svg" />
                      ) : (
                        <AssistantLogo size={32} />
                      )}
                      <AvatarFallback className={message.sender === 'user' ? 'bg-teal-700' : 'bg-gray-700'}>
                        {message.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="absolute -left-3 -top-3">
                          <AssistantLogo size={16} />
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
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
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[85%]">
                    <Avatar className="h-8 w-8 mr-2 bg-gray-800">
                      <AssistantLogo size={32} />
                      <AvatarFallback className="bg-gray-700">
                        <Bot size={14} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-gray-800 text-white">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <p className="text-sm">Thinking...</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t border-gray-800 bg-gray-900">
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
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                disabled={isLoading}
              />
              <Button 
                onClick={() => handleSendMessage()} 
                size="icon" 
                className="bg-teal-600 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                onClick={() => handleSuggestedQuery("How to buy property in Islamabad?")}
                disabled={isLoading}
              >
                Buying Process
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                onClick={() => handleSuggestedQuery("Best property investment areas?")}
                disabled={isLoading}
              >
                Investment Areas
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                onClick={() => handleSuggestedQuery("Property rates in F sectors?")}
                disabled={isLoading}
              >
                F-Sector Rates
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                onClick={() => handleSuggestedQuery("Current real estate market trends?")}
                disabled={isLoading}
              >
                Market Trends
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="topics" className="flex-1 m-0 p-0 overflow-hidden">
          <ScrollArea className="h-full p-4 bg-gray-950">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-3 text-white">
                  <Home className="h-5 w-5 mr-2 text-teal-400" />
                  Buying Property
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQueries
                    .filter((q) => q.category === 'buying')
                    .map((query) => (
                      <Button
                        key={query.id}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3 text-left border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                        onClick={() => handleSuggestedQuery(query.text)}
                        disabled={isLoading}
                      >
                        {query.text}
                      </Button>
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-3 text-white">
                  <Home className="h-5 w-5 mr-2 text-teal-400" />
                  Renting Property
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQueries
                    .filter((q) => q.category === 'renting')
                    .map((query) => (
                      <Button
                        key={query.id}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3 text-left border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                        onClick={() => handleSuggestedQuery(query.text)}
                        disabled={isLoading}
                      >
                        {query.text}
                      </Button>
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-3 text-white">
                  <Building className="h-5 w-5 mr-2 text-teal-400" />
                  Investment Advice
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQueries
                    .filter((q) => q.category === 'investment')
                    .map((query) => (
                      <Button
                        key={query.id}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3 text-left border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                        onClick={() => handleSuggestedQuery(query.text)}
                        disabled={isLoading}
                      >
                        {query.text}
                      </Button>
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-3 text-white">
                  <MapPin className="h-5 w-5 mr-2 text-teal-400" />
                  Property Rates
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQueries
                    .filter((q) => q.category === 'rates')
                    .map((query) => (
                      <Button
                        key={query.id}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3 text-left border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                        onClick={() => handleSuggestedQuery(query.text)}
                        disabled={isLoading}
                      >
                        {query.text}
                      </Button>
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-3 text-white">
                  <BarChart className="h-5 w-5 mr-2 text-teal-400" />
                  Market Trends
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQueries
                    .filter((q) => q.category === 'trends')
                    .map((query) => (
                      <Button
                        key={query.id}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3 text-left border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                        onClick={() => handleSuggestedQuery(query.text)}
                        disabled={isLoading}
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
