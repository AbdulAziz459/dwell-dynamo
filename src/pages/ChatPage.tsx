
import MainLayout from '@/components/layout/MainLayout';
import PropertyChatbot from '@/components/messaging/PropertyChatbot';
import { MessageSquareText, Bot, BrainCircuit, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ChatPage = () => {
  return (
    <MainLayout>
      <div className="bg-gray-950 dark:bg-gray-950 text-white min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-2">
              <Bot className="h-8 w-8 text-teal-400" />
              Property Assistant
            </h1>
            <p className="text-gray-400 mt-2">
              Get quick answers to your property queries from our intelligent chatbot
            </p>
          </div>
          
          <div className="mb-8">
            <PropertyChatbot />
          </div>

          <Card className="bg-gray-900 border-gray-800 shadow-md mt-8">
            <CardContent className="p-6">
              <div className="flex items-start">
                <Bot className="h-6 w-6 text-teal-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-heading font-semibold text-white">About the Property Assistant</h2>
                  <p className="text-gray-400 mt-2">
                    Our Property Assistant is designed to help you navigate the real estate market in Islamabad. 
                    It can answer questions about buying, renting, and investing in properties, as well as provide
                    information about current property rates in different areas. For more complex inquiries or 
                    personalized assistance, please contact our agents directly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <Card className="bg-gray-900 border-gray-800 shadow-md hover:bg-gray-800 transition-all">
              <CardContent className="p-4 flex items-start">
                <MessageSquareText className="text-teal-400 h-6 w-6 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">Buying Process</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Learn about property buying procedures
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800 shadow-md hover:bg-gray-800 transition-all">
              <CardContent className="p-4 flex items-start">
                <Building className="text-teal-400 h-6 w-6 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">Investment Areas</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Discover profitable investment locations
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800 shadow-md hover:bg-gray-800 transition-all">
              <CardContent className="p-4 flex items-start">
                <BrainCircuit className="text-teal-400 h-6 w-6 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">F-Sector Rates</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Current property rates in F sectors
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800 shadow-md hover:bg-gray-800 transition-all">
              <CardContent className="p-4 flex items-start">
                <BrainCircuit className="text-teal-400 h-6 w-6 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">Market Trends</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Latest real estate market analysis
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
