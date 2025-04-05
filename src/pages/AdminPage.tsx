
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
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
