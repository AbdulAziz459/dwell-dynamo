
export interface Property {
  id: string;
  title: string;
  type: string;
  status: 'active' | 'pending' | 'inactive';
  price: number;
  location: string;
  createdAt: string;
}
