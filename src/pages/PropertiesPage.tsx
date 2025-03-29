
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PropertyCard from '@/components/properties/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { properties, getPropertiesByType, Property } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';

const PropertiesPage = () => {
  const location = useLocation();
  const { user, isPropertyFavorite, addToFavorites, removeFromFavorites, addSearchQuery } = useAuth();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'any',
    bathrooms: 'any',
    features: [] as string[],
    sortBy: 'newest',
  });
  
  // Parse query parameters from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Extract and set filters from URL params
    const typeParam = params.get('type') || 'all';
    const statusParam = params.get('status') || 'all';
    const minPriceParam = params.get('minPrice') || '';
    const maxPriceParam = params.get('maxPrice') || '';
    
    setFilters(prev => ({
      ...prev,
      type: typeParam,
      status: statusParam,
      minPrice: minPriceParam,
      maxPrice: maxPriceParam,
    }));
    
    // Record search query for recommendations if user is logged in
    if (user) {
      const searchTerms = Array.from(params.entries())
        .map(([key, value]) => `${key}:${value}`)
        .join(', ');
      
      if (searchTerms) {
        addSearchQuery(searchTerms);
      }
    }
  }, [location.search, user]);
  
  // Apply filters whenever they change
  useEffect(() => {
    let filtered = [...properties];
    
    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(property => property.type === filters.type);
    }
    
    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(property => property.status === filters.status);
    }
    
    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= Number(filters.maxPrice));
    }
    
    // Filter by bedrooms
    if (filters.bedrooms !== 'any') {
      const bedroomCount = Number(filters.bedrooms);
      filtered = filtered.filter(property => 
        filters.bedrooms === '4+' 
          ? property.features.bedrooms >= 4
          : property.features.bedrooms === bedroomCount
      );
    }
    
    // Filter by bathrooms
    if (filters.bathrooms !== 'any') {
      const bathroomCount = Number(filters.bathrooms);
      filtered = filtered.filter(property => 
        filters.bathrooms === '3+' 
          ? property.features.bathrooms >= 3
          : property.features.bathrooms === bathroomCount
      );
    }
    
    // Filter by features
    if (filters.features.length > 0) {
      filtered = filtered.filter(property => {
        if (filters.features.includes('furnished') && !property.features.furnished) {
          return false;
        }
        if (filters.features.includes('parking') && !property.features.parking) {
          return false;
        }
        return true;
      });
    }
    
    // Sort properties
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    setFilteredProperties(filtered);
  }, [filters]);
  
  const handleFilterChange = (key: string, value: string | string[]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const toggleFeature = (feature: string) => {
    setFilters(prev => {
      const features = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };
  
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
  
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold">
                {filters.type === 'all' ? 'All Properties' : `${filters.type.charAt(0).toUpperCase() + filters.type.slice(1)}s`}
                {filters.status !== 'all' && ` for ${filters.status}`}
              </h1>
              <p className="text-muted-foreground mt-1">
                {filteredProperties.length} properties found
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange('sortBy', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Properties</SheetTitle>
                    <SheetDescription>
                      Refine your search with these filters.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-4 space-y-6">
                    <div>
                      <Label htmlFor="status">Property Status</Label>
                      <Select
                        id="status"
                        value={filters.status}
                        onValueChange={(value) => handleFilterChange('status', value)}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="sale">For Sale</SelectItem>
                          <SelectItem value="rent">For Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="type">Property Type</Label>
                      <Select
                        id="type"
                        value={filters.type}
                        onValueChange={(value) => handleFilterChange('type', value)}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="house">Houses</SelectItem>
                          <SelectItem value="apartment">Apartments</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="plot">Plots</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Price Range</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <Input
                          type="number"
                          placeholder="Min Price"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        />
                        <Input
                          type="number"
                          placeholder="Max Price"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select
                        id="bedrooms"
                        value={filters.bedrooms}
                        onValueChange={(value) => handleFilterChange('bedrooms', value)}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4+">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select
                        id="bathrooms"
                        value={filters.bathrooms}
                        onValueChange={(value) => handleFilterChange('bathrooms', value)}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3+">3+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label className="block mb-2">Features</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="furnished" 
                            checked={filters.features.includes('furnished')}
                            onCheckedChange={() => toggleFeature('furnished')}
                          />
                          <label
                            htmlFor="furnished"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Furnished
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="parking" 
                            checked={filters.features.includes('parking')}
                            onCheckedChange={() => toggleFeature('parking')}
                          />
                          <label
                            htmlFor="parking"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Parking
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={isPropertyFavorite(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search criteria
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setFilters({
                  type: 'all',
                  status: 'all',
                  minPrice: '',
                  maxPrice: '',
                  bedrooms: 'any',
                  bathrooms: 'any',
                  features: [],
                  sortBy: 'newest',
                })}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PropertiesPage;
