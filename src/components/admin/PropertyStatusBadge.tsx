
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface PropertyStatusBadgeProps {
  status: 'active' | 'pending' | 'inactive';
}

const PropertyStatusBadge = ({ status }: PropertyStatusBadgeProps) => {
  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Inactive
        </span>
      );
  }
};

export default PropertyStatusBadge;
