
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Bed, 
  Bath, 
  SquareFoot, 
  Check, 
  Calendar 
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPropertyById, getRecommendedProperties } from '@/lib/data';
import { formatPrice, formatArea, dateTimeFormat, getInitials } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import PropertyCard from '@/components/properties/PropertyCard';

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isPropertyFavorite, addToFavorites, removeFromFavorites } = useAuth();
  const [property, setProperty] = useState(id ? getPropertyById(id) : null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (id) {
      const propertyData = getPropertyById(id);
      setProperty(propertyData);
      
      // Get similar properties (in a real app, this would be an API call)
      if (propertyData) {
        // For demo, just get some other properties of the same type
        const recommended = user 
          ? getRecommendedProperties(user.id)
          : getPropertyById 
            ? [1, 2, 3, 4].map(i => {
                const randomId = ((parseInt(id) + i) % 8) + 1;
                return getPropertyById(randomId.toString());
              }).filter(Boolean)
            : [];
        
        setSimilarProperties(recommended);
      }
    }
  }, [id, user]);
  
  if (!property) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/properties">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const toggleFavorite = () => {
    if (!user) {
      // Prompt user to login
      return;
    }
    
    if (isPropertyFavorite(property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <Link to="/properties" className="inline-flex items-center text-muted-foreground hover:text-primary transition">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Properties
              </Link>
            </div>
            <div className="flex items-center mt-4 sm:mt-0">
              <Badge className="capitalize mr-2 bg-teal-600">
                {property.status === 'sale' ? 'For Sale' : 'For Rent'}
              </Badge>
              <Badge variant="outline" className="capitalize mr-4 bg-orange-600 text-white">
                {property.type}
              </Badge>
              <Button 
                variant="outline" 
                size="icon" 
                className={`${isPropertyFavorite(property.id) ? 'bg-red-50 border-red-200 dark:bg-red-900/20' : ''}`}
                onClick={toggleFavorite}
              >
                <Heart 
                  className={`h-5 w-5 ${isPropertyFavorite(property.id) ? 'fill-red-500 text-red-500' : ''}`} 
                />
              </Button>
            </div>
          </div>
          
          {/* Property Title */}
          <h1 className="text-3xl font-heading font-bold mb-2">{property.title}</h1>
          <div className="flex items-center text-muted-foreground mb-8">
            <MapPin size={16} className="mr-1" />
            <span>{property.location.address}</span>
          </div>
          
          {/* Property Images Carousel */}
          <div className="mb-8">
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-xl">
                      <img
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            
            <div className="grid grid-cols-4 gap-2 mt-2">
              {property.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`
                    h-20 cursor-pointer rounded-md overflow-hidden border-2
                    ${activeImageIndex === index ? 'border-teal-500' : 'border-transparent'}
                  `}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                  <p className="text-muted-foreground text-sm mb-1">Price</p>
                  <p className="font-bold text-xl">{formatPrice(property.price)}</p>
                </div>
                {property.features.bedrooms > 0 && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                    <p className="text-muted-foreground text-sm mb-1">Bedrooms</p>
                    <p className="font-bold text-xl">{property.features.bedrooms}</p>
                  </div>
                )}
                {property.features.bathrooms > 0 && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                    <p className="text-muted-foreground text-sm mb-1">Bathrooms</p>
                    <p className="font-bold text-xl">{property.features.bathrooms}</p>
                  </div>
                )}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                  <p className="text-muted-foreground text-sm mb-1">Area</p>
                  <p className="font-bold text-xl">{formatArea(property.features.area)}</p>
                </div>
              </div>
              
              <Tabs defaultValue="overview">
                <TabsList className="w-full border-b">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="pt-4">
                  <h3 className="font-heading text-xl font-semibold mb-4">Property Description</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {property.description}
                  </p>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="font-heading text-xl font-semibold mb-4">Property Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                    <div className="flex items-center">
                      <span className="text-muted-foreground">Property ID:</span>
                      <span className="ml-2 font-medium">{property.id}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground">Property Type:</span>
                      <span className="ml-2 font-medium capitalize">{property.type}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="ml-2 font-medium capitalize">For {property.status}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground">Area:</span>
                      <span className="ml-2 font-medium">{formatArea(property.features.area)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground">Listed On:</span>
                      <span className="ml-2 font-medium">{dateTimeFormat(property.createdAt)}</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="pt-4">
                  <h3 className="font-heading text-xl font-semibold mb-4">Property Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
                    {property.features.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Check className="text-teal-500 mr-2 h-5 w-5" />
                        <span>{property.features.bedrooms} Bedrooms</span>
                      </div>
                    )}
                    {property.features.bathrooms > 0 && (
                      <div className="flex items-center">
                        <Check className="text-teal-500 mr-2 h-5 w-5" />
                        <span>{property.features.bathrooms} Bathrooms</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Check className="text-teal-500 mr-2 h-5 w-5" />
                      <span>{formatArea(property.features.area)} Area</span>
                    </div>
                    {property.features.furnished && (
                      <div className="flex items-center">
                        <Check className="text-teal-500 mr-2 h-5 w-5" />
                        <span>Furnished</span>
                      </div>
                    )}
                    {property.features.parking && (
                      <div className="flex items-center">
                        <Check className="text-teal-500 mr-2 h-5 w-5" />
                        <span>Parking Available</span>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="location" className="pt-4">
                  <h3 className="font-heading text-xl font-semibold mb-4">Location</h3>
                  <p className="mb-4">
                    <MapPin className="inline-block mr-2 h-5 w-5 text-teal-500" />
                    {property.location.address}, {property.location.area}, {property.location.city}
                  </p>
                  
                  <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Map of {property.location.area}, {property.location.city} would be displayed here.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4">Contact Agent</h3>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-14 w-14 mr-4">
                      <AvatarImage src={property.agent.image} alt={property.agent.name} />
                      <AvatarFallback>{getInitials(property.agent.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{property.agent.name}</p>
                      <p className="text-sm text-muted-foreground">Real Estate Agent</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-muted-foreground mr-3" />
                      <span>{property.agent.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                      <span>{property.agent.email}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full">Request a Viewing</Button>
                </CardContent>
              </Card>
              
              {/* Mortgage Calculator Teaser */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4">Mortgage Calculator</h3>
                  <p className="text-muted-foreground mb-4">
                    Get an estimate of your monthly mortgage payments for this property.
                  </p>
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Property Price:</span>
                      <span className="font-medium">{formatPrice(property.price)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Down Payment (20%):</span>
                      <span className="font-medium">{formatPrice(property.price * 0.2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Loan Amount:</span>
                      <span className="font-medium">{formatPrice(property.price * 0.8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Monthly Payment:</span>
                      <span className="font-medium">{formatPrice((property.price * 0.8 * 0.006))}</span>
                    </div>
                  </div>
                  <Link to="/calculator">
                    <Button variant="outline" className="w-full">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Construction Cost
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-heading font-semibold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProperties.map(prop => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    isFavorite={isPropertyFavorite(prop.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PropertyDetailPage;
