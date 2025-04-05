
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PropertyActionsProps {
  propertyId: string;
  onEdit: (propertyId: string) => void;
  onRemove: (propertyId: string) => void;
}

const PropertyActions = ({ propertyId, onEdit, onRemove }: PropertyActionsProps) => {
  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(propertyId)}>
            <Edit className="h-4 w-4 mr-2 text-blue-500" />
            Edit Property
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRemove(propertyId)}>
            <Trash2 className="h-4 w-4 mr-2 text-red-500" />
            Remove Listing
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PropertyActions;
