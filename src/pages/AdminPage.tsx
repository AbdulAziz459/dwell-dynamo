
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shield, 
  Building, 
  MoreHorizontal, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Clock,
  PlusCircle,
  Edit
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define a simple Property type
interface Property {
  id: string;
  title: string;
  type: string;
  status: 'active' | 'pending' | 'inactive';
  price: number;
  location: string;
  createdAt: string;
}

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin, removeProperty } = useAuth();
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is admin
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!isAdmin()) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have permission to access this page.",
      });
      navigate('/dashboard');
      return;
    }
    
    // Simulate fetching real properties
    const fetchProperties = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Start with an empty list - no dummy data
        setProperties([]);
        setIsLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load property data.",
        });
        setIsLoading(false);
      }
    };
    
    fetchProperties();
  }, [user, isAdmin, navigate, toast]);
  
  const handleRemoveProperty = async (propertyId: string) => {
    const success = await removeProperty(propertyId);
    if (success) {
      setProperties(prev => prev.filter(p => p.id !== propertyId));
    }
  };
  
  const handleAddProperty = () => {
    navigate('/add-property');
  };
  
  const handleEditProperty = (propertyId: string) => {
    toast({
      title: "Edit Property",
      description: `Navigating to edit property ${propertyId}`,
    });
    // In a real app, this would navigate to an edit page
    // navigate(`/edit-property/${propertyId}`);
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
            <p className="text-muted-foreground">Loading admin dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage property listings
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Building className="h-5 w-5 mr-2 text-primary" />
                  Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{properties.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Total properties in the system</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Property Management</CardTitle>
                <CardDescription>
                  Manage all property listings in the system
                </CardDescription>
              </div>
              <Button onClick={handleAddProperty} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Property
              </Button>
            </CardHeader>
            <CardContent>
              {properties.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Building className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg font-medium mb-1">No properties found</h3>
                  <p className="text-sm">
                    Start by adding your first property listing
                  </p>
                  <Button 
                    onClick={handleAddProperty} 
                    variant="outline" 
                    className="mt-4">
                    Add Your First Property
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 bg-muted p-3 font-medium">
                    <div className="col-span-2">Property</div>
                    <div>Type</div>
                    <div>Status</div>
                    <div>Price</div>
                    <div className="text-right">Actions</div>
                  </div>
                  
                  {properties.map((property) => (
                    <div key={property.id} className="grid grid-cols-6 p-3 border-t items-center">
                      <div className="col-span-2">
                        <div className="font-medium">{property.title}</div>
                        <div className="text-sm text-muted-foreground">{property.location}</div>
                      </div>
                      <div className="capitalize">{property.type}</div>
                      <div>
                        {property.status === 'active' ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </span>
                        ) : property.status === 'pending' ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Inactive
                          </span>
                        )}
                      </div>
                      <div>${property.price.toLocaleString()}</div>
                      <div className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditProperty(property.id)}>
                              <Edit className="h-4 w-4 mr-2 text-blue-500" />
                              Edit Property
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRemoveProperty(property.id)}>
                              <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                              Remove Listing
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
