
import { PlusCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Property } from '@/types/property';
import PropertiesList from './PropertiesList';
import EmptyProperties from './EmptyProperties';

interface PropertyManagementProps {
  properties: Property[];
  isLoading: boolean;
  onAddProperty: () => void;
  onEditProperty: (propertyId: string) => void;
  onRemoveProperty: (propertyId: string) => void;
}

const PropertyManagement = ({ 
  properties, 
  isLoading, 
  onAddProperty, 
  onEditProperty, 
  onRemoveProperty 
}: PropertyManagementProps) => {
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Clock className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Property Management</CardTitle>
          <CardDescription>
            Manage all property listings in the system
          </CardDescription>
        </div>
        <Button onClick={onAddProperty} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Property
        </Button>
      </CardHeader>
      <CardContent>
        {properties.length === 0 ? (
          <EmptyProperties onAddProperty={onAddProperty} />
        ) : (
          <PropertiesList 
            properties={properties} 
            onEdit={onEditProperty}
            onRemove={onRemoveProperty}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyManagement;
