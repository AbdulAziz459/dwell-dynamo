
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { BrainCircuit, ArrowRight, Home, Building, MapPin } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PropertyCard from '@/components/properties/PropertyCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getRecommendedProperties, getPropertiesByType } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';

const RecommendationsPage = () => {
  const { user, isLoading, isPropertyFavorite, addToFavorites, removeFromFavorites } = useAuth();
  const [recommendedProperties, setRecommendedProperties] = useState<any[]>([]);
  const [otherProperties, setOtherProperties] = useState<any[]>([]);
  
  useEffect(() => {
    if (user) {
      // Get AI recommended properties based on user favorites and search history
      const recommended = getRecommendedProperties(user.id);
      setRecommendedProperties(recommended);
      
      // Get some random properties for users with no preferences yet
      if (recommended.length === 0) {
        const randomProperties = getPropertiesByType().slice(0, 4);
        setRecommendedProperties(randomProperties);
      }
      
      // Get other properties that are not in the recommendations
      const others = getPropertiesByType()
        .filter(prop => !recommended.some(rec => rec.id === prop.id))
        .slice(0, 4);
      setOtherProperties(others);
    } else {
      // For non-logged in users, just show some random properties
      const randomProperties = getPropertiesByType().slice(0, 4);
      setRecommendedProperties(randomProperties);
      
      const others = getPropertiesByType().slice(4, 8);
      setOtherProperties(others);
    }
  }, [user]);
  
  const toggleFavorite = (propertyId: string) => {
    if (!user) {
      // Prompt user to log in
      return;
    }
    
    if (isPropertyFavorite(propertyId)) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <BrainCircuit className="h-8 w-8 text-teal-600 dark:text-teal-400 mr-3" />
            <h1 className="text-3xl font-heading font-bold">Smart Property Recommendations</h1>
          </div>
          
          <p className="text-muted-foreground mb-8 max-w-3xl">
            {user 
              ? "Based on your favorites and search history, our AI system has curated these property recommendations just for you."
              : "Discover properties that might interest you. Create an account to get personalized recommendations based on your preferences."}
          </p>
          
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-semibold">
                {user ? "Recommended For You" : "Featured Properties"}
              </h2>
              {user && (
                <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">
                  AI Powered
                </Badge>
              )}
            </div>
            
            {recommendedProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  Save some properties as favorites or search for properties to get personalized recommendations.
                </p>
                <Button variant="outline" asChild>
                  <a href="/properties">Browse Properties</a>
                </Button>
              </div>
            )}
          </div>
          
          <Separator className="my-12" />
          
          {otherProperties.length > 0 && (
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-6">More Properties You Might Like</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={isPropertyFavorite(property.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button asChild>
                  <a href="/properties" className="flex items-center">
                    Browse All Properties
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-heading font-semibold mb-6">How Our AI Recommendations Work</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="bg-teal-100 dark:bg-teal-900/30 rounded-full p-3 inline-block mb-4">
                  <Home className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-medium text-lg mb-2">Your Favorites</h3>
                <p className="text-muted-foreground">
                  We analyze your favorite properties to understand your preferences in terms of property type, location, and price range.
                </p>
              </div>
              
              <div>
                <div className="bg-teal-100 dark:bg-teal-900/30 rounded-full p-3 inline-block mb-4">
                  <Search className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-medium text-lg mb-2">Search History</h3>
                <p className="text-muted-foreground">
                  Your search patterns and filters help us learn what specific features and areas you're most interested in.
                </p>
              </div>
              
              <div>
                <div className="bg-teal-100 dark:bg-teal-900/30 rounded-full p-3 inline-block mb-4">
                  <MapPin className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-medium text-lg mb-2">Location Matching</h3>
                <p className="text-muted-foreground">
                  Our system identifies properties in your preferred neighborhoods or areas with similar characteristics.
                </p>
              </div>
            </div>
            
            {!user && (
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Create an account to get personalized property recommendations based on your preferences.
                </p>
                <Button asChild>
                  <a href="/register">Sign Up Now</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RecommendationsPage;
