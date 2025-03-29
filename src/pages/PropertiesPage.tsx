
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PropertyCard from '@/components/properties/PropertyCard';
import { getPropertiesByType } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import { Property } from '@/lib/data';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || 'all');
  const [propertyStatus, setPropertyStatus] = useState(searchParams.get('status') || 'all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000); // 100 million PKR
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const { user, isPropertyFavorite, addToFavorites, removeFromFavorites, addSearchQuery } = useAuth();

  // Format price to display in a readable format
  const formatPriceDisplay = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(2)} Lac`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(2)}K`;
    }
    return price.toString();
  };

  useEffect(() => {
    // Get initial values from URL if available
    const typeParam = searchParams.get('type');
    const statusParam = searchParams.get('status');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    
    if (typeParam) setPropertyType(typeParam);
    if (statusParam) setPropertyStatus(statusParam);
    if (minPriceParam) setMinPrice(Number(minPriceParam));
    if (maxPriceParam) setMaxPrice(Number(maxPriceParam));
    
    // Set initial price range
    if (minPriceParam || maxPriceParam) {
      setPriceRange([
        minPriceParam ? Number(minPriceParam) : minPrice,
        maxPriceParam ? Number(maxPriceParam) : maxPrice
      ]);
    }
    
    loadProperties();
  }, []);

  useEffect(() => {
    // Update URL parameters when filters change
    const params = new URLSearchParams();
    if (propertyType !== 'all') params.set('type', propertyType);
    if (propertyStatus !== 'all') params.set('status', propertyStatus);
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < 100000000) params.set('maxPrice', priceRange[1].toString());
    
    setSearchParams(params);
    loadProperties();
    
    // Save search query for logged-in users
    if (user) {
      const queryParts = [];
      if (propertyType !== 'all') queryParts.push(propertyType);
      if (propertyStatus !== 'all') queryParts.push(propertyStatus === 'sale' ? 'for sale' : 'for rent');
      if (priceRange[0] > 0 || priceRange[1] < 100000000) {
        queryParts.push(`${formatPriceDisplay(priceRange[0])} - ${formatPriceDisplay(priceRange[1])}`);
      }
      
      if (queryParts.length > 0) {
        addSearchQuery(queryParts.join(', '));
      }
    }
  }, [propertyType, propertyStatus, priceRange]);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const filteredProperties = getPropertiesByType(
        propertyType === 'all' ? undefined : propertyType,
        propertyStatus === 'all' ? undefined : propertyStatus,
        priceRange[0],
        priceRange[1]
      );
      setProperties(filteredProperties);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (id: string) => {
    if (user) {
      if (isPropertyFavorite(id)) {
        removeFromFavorites(id);
      } else {
        addToFavorites(id);
      }
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Properties in Islamabad</h1>
          <p className="text-muted-foreground mb-8">
            Find your perfect property in Islamabad with our comprehensive listings
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-fit">
              <h2 className="text-lg font-semibold">Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Property Type</label>
                  <Select
                    value={propertyType}
                    onValueChange={(value) => setPropertyType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Property Status</label>
                  <Select
                    value={propertyStatus}
                    onValueChange={(value) => setPropertyStatus(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-4 block">Price Range</label>
                  <div className="pt-6 pb-2">
                    <Slider
                      value={[priceRange[0], priceRange[1]]}
                      min={0}
                      max={100000000}
                      step={1000000}
                      onValueChange={(value) => {
                        if (Array.isArray(value) && value.length === 2) {
                          setPriceRange([value[0], value[1]]);
                        }
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatPriceDisplay(priceRange[0])}</span>
                    <span>{formatPriceDisplay(priceRange[1])}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Bedrooms</label>
                  <Select
                    value="any"
                    onValueChange={() => {}}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Bathrooms</label>
                  <Select
                    value="any"
                    onValueChange={() => {}}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Property Listings */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="text-center py-12">Loading properties...</div>
              ) : properties.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-medium">No properties found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search filters to find more properties
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground mb-4">Found {properties.length} properties</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map(property => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorite={user ? isPropertyFavorite(property.id) : false}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PropertiesPage;
