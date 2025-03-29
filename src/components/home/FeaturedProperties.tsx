
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { properties } from '@/lib/data';
import PropertyCard from '@/components/properties/PropertyCard';

const FeaturedProperties = () => {
  // State for favorites (in a real app, this would come from user data)
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // For demo purposes, just show the first 4 properties
  const featuredProperties = properties.slice(0, 4);
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-heading font-bold">Featured Properties</h2>
            <p className="text-muted-foreground mt-2">
              Explore our handpicked selection of premium properties in Islamabad
            </p>
          </div>
          <Link to="/properties">
            <Button variant="outline" className="hidden sm:flex items-center">
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link to="/properties">
            <Button variant="outline" className="w-full">
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
