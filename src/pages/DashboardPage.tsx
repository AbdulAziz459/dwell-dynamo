
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  User, 
  Heart, 
  History, 
  BrainCircuit, 
  Search,
  Calendar,
  MessageSquare
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { getPropertyById, getRecommendedProperties } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import { getInitials, dateTimeFormat } from '@/lib/utils';
import PropertyCard from '@/components/properties/PropertyCard';

const DashboardPage = () => {
  const { user, isLoading, isPropertyFavorite, addToFavorites, removeFromFavorites } = useAuth();
  const [favoriteProperties, setFavoriteProperties] = useState<any[]>([]);
  const [recommendedProperties, setRecommendedProperties] = useState<any[]>([]);
  
  useEffect(() => {
    if (user) {
      // Get favorite properties
      const favorites = user.favorites
        .map(id => getPropertyById(id))
        .filter(Boolean);
      setFavoriteProperties(favorites);
      
      // Get recommended properties
      const recommended = getRecommendedProperties(user.id);
      setRecommendedProperties(recommended);
    }
  }, [user]);
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const toggleFavorite = (propertyId: string) => {
    if (isPropertyFavorite(propertyId)) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center">
              <Avatar className="h-20 w-20 mb-4 md:mb-0 md:mr-6">
                <AvatarImage src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 10)}.jpg`} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-heading font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-auto">
                <Button variant="outline">Edit Profile</Button>
              </div>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="favorites">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="favorites" className="flex flex-col items-center py-3">
                <Heart className="h-5 w-5 mb-1" />
                <span>Favorites</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex flex-col items-center py-3">
                <BrainCircuit className="h-5 w-5 mb-1" />
                <span>Recommendations</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex flex-col items-center py-3">
                <History className="h-5 w-5 mb-1" />
                <span>Search History</span>
              </TabsTrigger>
              <TabsTrigger value="inquiries" className="flex flex-col items-center py-3">
                <MessageSquare className="h-5 w-5 mb-1" />
                <span>Inquiries</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="favorites">
              <h2 className="text-2xl font-heading font-semibold mb-6">Your Favorite Properties</h2>
              
              {favoriteProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {favoriteProperties.map(property => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isFavorite={true}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No favorite properties yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    When you find properties you like, click the heart icon to save them here for easy access.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/properties">Browse Properties</a>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recommendations">
              <h2 className="text-2xl font-heading font-semibold mb-6">Recommended For You</h2>
              
              {recommendedProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {recommendedProperties.map(property => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isFavorite={isPropertyFavorite(property.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <BrainCircuit className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No recommendations yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Browse more properties or save favorites to get personalized recommendations based on your preferences.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/properties">Browse Properties</a>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              <h2 className="text-2xl font-heading font-semibold mb-6">Your Search History</h2>
              
              {user.searchHistory.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="px-6 py-3 text-muted-foreground">Search Query</th>
                          <th className="px-6 py-3 text-muted-foreground">Date</th>
                          <th className="px-6 py-3 text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.searchHistory.map((item, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <Search className="h-4 w-4 text-muted-foreground mr-2" />
                                <span>{item.query}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">
                              {dateTimeFormat(item.timestamp)}
                            </td>
                            <td className="px-6 py-4">
                              <Button variant="link" size="sm" className="h-8 px-2">Repeat Search</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No search history yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Your search history will appear here as you browse and search for properties.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/properties">Browse Properties</a>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="inquiries">
              <h2 className="text-2xl font-heading font-semibold mb-6">Your Property Inquiries</h2>
              
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No inquiries yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  When you contact agents or request property viewings, your inquiries will appear here.
                </p>
                <Button variant="outline" asChild>
                  <a href="/properties">Browse Properties</a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
