
import { Edit, Trash2, MoreHorizontal, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PropertyActionsProps {
  propertyId: string;
  currentStatus: 'active' | 'pending' | 'inactive';
  onEdit: (propertyId: string) => void;
  onRemove: (propertyId: string) => void;
  onUpdateStatus: (propertyId: string, status: 'active' | 'pending' | 'inactive') => void;
}

const PropertyActions = ({ 
  propertyId, 
  currentStatus, 
  onEdit, 
  onRemove, 
  onUpdateStatus 
}: PropertyActionsProps) => {
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
          
          <DropdownMenuSeparator />
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span className="flex items-center">
                {currentStatus === 'active' && <CheckCircle className="h-4 w-4 mr-2 text-green-500" />}
                {currentStatus === 'pending' && <Clock className="h-4 w-4 mr-2 text-yellow-500" />}
                {currentStatus === 'inactive' && <AlertCircle className="h-4 w-4 mr-2 text-gray-500" />}
                Update Status
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem 
                onClick={() => onUpdateStatus(propertyId, 'active')}
                disabled={currentStatus === 'active'}
              >
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <span>Approve (Active)</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onUpdateStatus(propertyId, 'pending')}
                disabled={currentStatus === 'pending'}
              >
                <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                <span>Set as Pending</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onUpdateStatus(propertyId, 'inactive')}
                disabled={currentStatus === 'inactive'}
              >
                <AlertCircle className="h-4 w-4 mr-2 text-gray-500" />
                <span>Reject (Inactive)</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => onRemove(propertyId)} className="text-red-500">
            <Trash2 className="h-4 w-4 mr-2 text-red-500" />
            Remove Listing
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PropertyActions;
