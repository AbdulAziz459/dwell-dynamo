
import MainLayout from '@/components/layout/MainLayout';
import PropertyChatbot from '@/components/messaging/PropertyChatbot';
import { MessageSquareText, Bot, BrainCircuit, Building } from 'lucide-react';

const ChatPage = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold">Property Assistant</h1>
            <p className="text-muted-foreground mt-2">
              Get quick answers to your property queries from our intelligent chatbot
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-start">
              <MessageSquareText className="text-primary h-10 w-10 mr-3" />
              <div>
                <h3 className="font-medium">Instant Answers</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Get immediate responses to your property questions without waiting
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-start">
              <BrainCircuit className="text-primary h-10 w-10 mr-3" />
              <div>
                <h3 className="font-medium">Market Knowledge</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Access up-to-date information about property rates and market trends
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-start">
              <Building className="text-primary h-10 w-10 mr-3" />
              <div>
                <h3 className="font-medium">Buying & Renting Advice</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Learn about property processes, documentation, and best practices
                </p>
              </div>
            </div>
          </div>
          
          <PropertyChatbot />
          
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <Bot className="h-6 w-6 text-primary mr-3 mt-1" />
              <div>
                <h2 className="text-xl font-heading font-semibold">About the Property Assistant</h2>
                <p className="text-muted-foreground mt-2">
                  Our Property Assistant is designed to help you navigate the real estate market in Islamabad. 
                  It can answer questions about buying, renting, and investing in properties, as well as provide
                  information about current property rates in different areas. For more complex inquiries or 
                  personalized assistance, please contact our agents directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
