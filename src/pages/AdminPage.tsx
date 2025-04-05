
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Property } from '@/types/property';

// Admin components
import AdminHeader from '@/components/admin/AdminHeader';
import AdminStats from '@/components/admin/AdminStats';
import PropertyManagement from '@/components/admin/PropertyManagement';

// Mock data for demonstration
const mockProperties: Property[] = [
  {
    id: 'prop1',
    title: 'Modern Apartment in Downtown',
    type: 'apartment',
    status: 'active',
    price: 250000,
    location: 'Downtown, New York',
    createdAt: '2025-03-15T10:30:00Z',
  },
  {
    id: 'prop2',
    title: 'Cozy Family House with Garden',
    type: 'house',
    status: 'pending',
    price: 450000,
    location: 'Suburb, Chicago',
    createdAt: '2025-03-10T14:45:00Z',
  },
  {
    id: 'prop3',
    title: 'Studio Loft in Art District',
    type: 'condo',
    status: 'inactive',
    price: 180000,
    location: 'Art District, Los Angeles',
    createdAt: '2025-02-28T09:15:00Z',
  }
];

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
    
    // Fetch properties
    const fetchProperties = async () => {
      try {
        // In a real app, this would be an API call to fetch user-added properties
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Using mock data for demonstration
        setProperties(mockProperties);
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
      toast({
        title: "Property Removed",
        description: "The property has been successfully removed.",
      });
    }
  };
  
  const handleUpdatePropertyStatus = (propertyId: string, newStatus: 'active' | 'pending' | 'inactive') => {
    setProperties(prev => 
      prev.map(property => 
        property.id === propertyId 
          ? { ...property, status: newStatus } 
          : property
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Property status changed to ${newStatus}.`,
    });
  };
  
  const handleEditProperty = (propertyId: string) => {
    toast({
      title: "Edit Property",
      description: `Navigating to edit property ${propertyId}`,
    });
    // In a real app, this would navigate to an edit page or open a modal
    // navigate(`/edit-property/${propertyId}`);
  };
  
  const handleAddProperty = () => {
    navigate('/add-property');
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminHeader />
          <AdminStats propertiesCount={properties.length} />
          <PropertyManagement 
            properties={properties}
            isLoading={isLoading}
            onAddProperty={handleAddProperty}
            onEditProperty={handleEditProperty}
            onRemoveProperty={handleRemoveProperty}
            onUpdateStatus={handleUpdatePropertyStatus}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
