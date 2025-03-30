
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatbotResponses } from '@/lib/data';
import { Send, Bot, Building, Home, User, HelpCircle, MessageSquare, Clock, BarChart, DollarSign, MapPin, BriefcaseBusiness } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const suggestedQueries = [
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
      } else if (lowercaseQuery.includes('document') || lowercaseQuery.includes('paper')) {
        return "To buy property in Pakistan, you'll need: 1) CNIC/NICOP, 2) Passport-sized photographs, 3) Copy of seller's title deed, 4) Non-Encumbrance Certificate, 5) Property tax receipts, 6) Token money receipt, 7) Sale deed/agreement. For overseas Pakistanis, a power of attorney might be needed.";
      } else if (lowercaseQuery.includes('inspect') || lowercaseQuery.includes('examination')) {
        return "When inspecting property: 1) Check for structural issues (cracks, dampness), 2) Verify all utilities are working, 3) Examine electrical wiring and plumbing, 4) Check water pressure and drainage, 5) Look for any encroachments, 6) Visit at different times of day, 7) Check the neighborhood and nearby facilities, 8) Always bring a professional inspector if possible.";
      } else if (lowercaseQuery.includes('negotiat') || lowercaseQuery.includes('bargain') || lowercaseQuery.includes('price')) {
        return "For successful property price negotiation: 1) Research market rates thoroughly, 2) Point out property flaws that warrant a discount, 3) Be prepared to walk away, 4) Start with a reasonable offer (usually 10-15% below asking), 5) Get pre-approved financing to show seriousness, 6) Consider requesting additional inclusions rather than just price reduction, 7) Negotiate closing costs separately.";
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
      } else if (lowercaseQuery.includes('inspect') || lowercaseQuery.includes('check')) {
        return "Before renting, check: 1) Water supply and pressure, 2) Electricity connections and load capacity, 3) Gas connections, 4) Working condition of fans, ACs, and other fixtures, 5) Security of the area, 6) Parking space, 7) Access to main roads and markets, 8) Neighborhood environment, 9) Previous utility bills to estimate costs, 10) Any signs of leakage, dampness or pests.";
      } else if (lowercaseQuery.includes('agreement') || lowercaseQuery.includes('contract')) {
        return "A good rental agreement should include: 1) Names and CNIC numbers of all parties, 2) Complete property address, 3) Rental amount and payment terms, 4) Security deposit amount and terms, 5) Duration of tenancy, 6) Notice period for termination, 7) Maintenance responsibilities, 8) Utility payment responsibilities, 9) Restrictions on property use, 10) Conditions for returning the security deposit. Have it notarized for legal validity.";
      } else if (lowercaseQuery.includes('deposit') || lowercaseQuery.includes('security')) {
        return "Standard security deposits in Pakistan are typically 2-3 months' rent. For luxury properties, it may go up to 6 months. The deposit is refundable at the end of the tenancy period, subject to deductions for damages beyond normal wear and tear. Always get a receipt for your security deposit payment.";
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
      } else if (lowercaseQuery.includes('commercial') || lowercaseQuery.includes('residential')) {
        return "Commercial vs Residential Investment: Commercial properties typically offer higher rental yields (6-10% annually vs 3-5% for residential), but require higher initial investment. Residential properties are easier to manage and have lower vacancy rates. Commercial leases are usually longer-term and tenants often handle maintenance, but finding commercial tenants can be more difficult. In Islamabad, commercial plots in Blue Area, F-7 Markaz and I-8 Markaz are seeing good appreciation.";
      } else if (lowercaseQuery.includes('risk') || lowercaseQuery.includes('danger')) {
        return "Real estate investment risks in Pakistan include: 1) Regulatory changes affecting property values, 2) Market volatility, especially in developing areas, 3) Title disputes and fraud, 4) Liquidity challenges when quick selling is needed, 5) Construction quality issues in new developments, 6) Legal complications with tenants, 7) Unexpected taxes or fee increases, 8) Delays in possession of property from developers. Always verify legal status through proper due diligence.";
      } else if (lowercaseQuery.includes('appreciation') || lowercaseQuery.includes('value increase')) {
        return "Areas with highest appreciation rates in Islamabad include: 1) New sectors like E-11, D-12, and B-17, 2) Bahria Town (especially Phase 8 and Bahria Enclave), 3) DHA Phases II and V, 4) Gulberg Residencia, 5) Capital Smart City. Properties near the new Islamabad International Airport have seen 25-30% appreciation in the last two years. Areas with planned infrastructure developments like the Margalla Avenue also show strong appreciation potential.";
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
      } else if (lowercaseQuery.includes('gulberg')) {
        return "In Gulberg, Islamabad: 5 marla plots range from PKR 50-70 lakh, 10 marla plots from PKR 1-1.4 crore, 1 kanal plots from PKR 1.8-2.5 crore. Residential apartments range from PKR 70 lakh to 1.8 crore depending on size and amenities. Commercial properties in Gulberg Greens start from PKR 1.5 crore for small shops to PKR 5 crore+ for larger commercial spaces.";
      } else if (lowercaseQuery.includes('bani gala')) {
        return "In Bani Gala, Islamabad: Property rates vary widely based on location, view, and road access. 1 kanal plots range from PKR 1.5-3 crore (higher for those with Rawal Lake or Margalla Hills views). Luxury farmhouses (4+ kanals) range from PKR 8-20 crore. The area remains popular due to its natural beauty and proximity to key government buildings, despite fluctuations in the market.";
      } else if (lowercaseQuery.includes('g-') || lowercaseQuery.includes('g sector')) {
        return "In G Sectors of Islamabad: G-6, G-7, and G-8 are well-established with 1 kanal houses ranging from PKR 3-5 crore. In G-9, G-10, and G-11, 1 kanal plots range from PKR 1.8-2.8 crore. G-13 and G-14 are more affordable with 10 marla plots from PKR 1-1.4 crore. Apartments in G-11 range from PKR 80 lakh to 1.5 crore. Commercial properties in G-9 Markaz range from PKR 3-7 crore depending on size and location.";
      } else if (lowercaseQuery.includes('i-') || lowercaseQuery.includes('i sector')) {
        return "In I Sectors of Islamabad: I-8 is among the most developed with 1 kanal plots ranging from PKR 2.2-3 crore. I-9 industrial area commercial plots range from PKR 2.5-4 crore. I-10 and I-11 residential plots (10 marla) range from PKR 90 lakh to 1.2 crore. I-14 and I-16 are developing sectors with more affordable rates, 10 marla plots ranging from PKR 70-90 lakh. Commercial plots in I-8 Markaz range from PKR 3-6 crore.";
      }
    }
    
    // Check for market trends
    if (lowercaseQuery.includes('trend') || lowercaseQuery.includes('market') || lowercaseQuery.includes('forecast')) {
      if (lowercaseQuery.includes('current') || lowercaseQuery.includes('now')) {
        return "Current real estate trends in Islamabad show moderate growth with 8-12% annual appreciation in developed sectors. There's increasing demand for apartments due to rising house prices. Government initiatives like Naya Pakistan Housing are impacting the affordable housing segment. Online property portals are becoming more significant in transactions. The luxury market remains stable with consistent demand in areas like DHA and Bahria Town.";
      } else if (lowercaseQuery.includes('forecast') || lowercaseQuery.includes('future') || lowercaseQuery.includes('predict')) {
        return "The Islamabad real estate forecast for the next 1-2 years indicates continued growth in new housing schemes around the motorway and airport. Economic challenges may slow luxury market growth, but mid-range properties should remain stable. Government housing initiatives and potential mortgage market expansion could boost affordable housing. Areas expected to see highest growth include Capital Smart City, Park View City, and sectors near the new airport.";
      } else if (lowercaseQuery.includes('best time') || lowercaseQuery.includes('when')) {
        return "The best time to invest in Pakistani real estate is typically during economic stabilization periods. Currently, prices are relatively stable after recent adjustments. For timing: 1) Watch for infrastructure announcements, which typically precede price increases, 2) Consider investing during winter months when market activity slows, 3) Look for political stability periods rather than election years, 4) Monitor interest rates, as lower rates typically boost the property market.";
      } else if (lowercaseQuery.includes('up') || lowercaseQuery.includes('coming') || lowercaseQuery.includes('emerging')) {
        return "Up-and-coming areas in Islamabad with growth potential include: 1) B-17 Multi Gardens, 2) I-14 and I-15 sectors, 3) Mouza Phulgran near Murree Expressway, 4) Top City-1 near the new airport, 5) Pakistan Town Phase 2, 6) Eighteen Islamabad, 7) Nova City, 8) Kingdom Valley. These areas offer more affordable entry points with significant appreciation potential due to planned infrastructure developments and improved accessibility.";
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
    return "I'm not sure about that. Could you try asking about buying, renting, investment advice, or property rates in Islamabad? You can also ask about current market trends or specific areas.";
  };
  
  const handleSuggestedQuery = (query: string) => {
    setInput(query);
    handleSendMessage(query);
  };
  
  return (
    <Card className="shadow-md border dark:border-gray-700">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="flex items-center text-lg">
          <Bot className="h-5 w-5 mr-2 text-primary" />
          Property Assistant
        </CardTitle>
      </CardHeader>
      
      <Tabs defaultValue="chat" className="flex flex-col h-[520px]">
        <TabsList className="grid grid-cols-2 mx-4 mb-2">
          <TabsTrigger value="chat" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="topics" className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            Topics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="flex-1 flex flex-col m-0 p-0 h-full overflow-hidden">
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
                    className={`flex max-w-[85%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <Avatar className={`h-8 w-8 ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                      {message.sender === 'user' ? (
                        <AvatarImage src="/placeholder.svg" />
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
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t dark:border-gray-700">
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
                className="flex-1"
              />
              <Button onClick={() => handleSendMessage()} size="icon">
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
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSuggestedQuery("Current real estate market trends?")}
              >
                Market Trends
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="topics" className="flex-1 m-0 p-0 overflow-hidden">
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
                        className="justify-start h-auto py-2 px-3 text-left"
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
                        className="justify-start h-auto py-2 px-3 text-left"
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
                        className="justify-start h-auto py-2 px-3 text-left"
                        onClick={() => handleSuggestedQuery(query.text)}
                      >
                        {query.text}
                      </Button>
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-3">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Property Rates
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQueries
                    .filter((q) => q.category === 'rates')
                    .map((query) => (
                      <Button
                        key={query.id}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3 text-left"
                        onClick={() => handleSuggestedQuery(query.text)}
                      >
                        {query.text}
                      </Button>
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-3">
                  <BarChart className="h-5 w-5 mr-2 text-primary" />
                  Market Trends
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQueries
                    .filter((q) => q.category === 'trends')
                    .map((query) => (
                      <Button
                        key={query.id}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3 text-left"
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
