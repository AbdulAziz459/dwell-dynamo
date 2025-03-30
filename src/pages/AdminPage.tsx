
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { properties, users } from '@/lib/data';
import { 
  Shield, 
  Building, 
  User, 
  MoreHorizontal, 
  Trash2, 
  UserCheck, 
  Clock, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin, removeProperty, updateUserRole } = useAuth();
  const { toast } = useToast();
  const [properties, setProperties] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
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
    
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock property data
        const mockProperties = [
          { id: 'p1', title: 'Luxury Apartment', type: 'apartment', status: 'active', owner: 'John Doe', createdAt: '2023-01-15' },
          { id: 'p2', title: 'Family Home', type: 'house', status: 'pending', owner: 'Jane Smith', createdAt: '2023-02-20' },
          { id: 'p3', title: 'Commercial Space', type: 'commercial', status: 'active', owner: 'Bob Johnson', createdAt: '2023-03-05' },
          { id: 'p4', title: 'Beachfront Villa', type: 'villa', status: 'inactive', owner: 'Alice Brown', createdAt: '2023-04-10' },
          { id: 'p5', title: 'City Center Office', type: 'office', status: 'active', owner: 'Mike Wilson', createdAt: '2023-05-25' },
        ];
        
        // Mock user data
        const mockUsers = [
          { id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joined: '2023-01-10' },
          { id: 'u2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', joined: '2023-02-15' },
          { id: 'u3', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', joined: '2022-12-01' },
          { id: 'u4', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive', joined: '2023-03-20' },
          { id: 'u5', name: 'Alice Brown', email: 'alice@example.com', role: 'user', status: 'active', joined: '2023-04-05' },
        ];
        
        setProperties(mockProperties);
        setUsers(mockUsers);
        setIsLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load admin data.",
        });
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user, isAdmin, navigate, toast]);
  
  const handleRemoveProperty = async (propertyId: string) => {
    const success = await removeProperty(propertyId);
    if (success) {
      setProperties(prev => prev.filter(p => p.id !== propertyId));
    }
  };
  
  const handleUpdateUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const success = await updateUserRole(userId, newRole as 'user' | 'admin');
    if (success) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    }
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
                Manage properties, users, and application settings
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
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{users.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Registered users in the system</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Admins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{users.filter(u => u.role === 'admin').length}</div>
                <p className="text-sm text-muted-foreground mt-1">Users with administrator privileges</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="properties" className="space-y-4">
            <TabsList>
              <TabsTrigger value="properties">
                <Building className="h-4 w-4 mr-2" />
                Properties
              </TabsTrigger>
              <TabsTrigger value="users">
                <User className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="properties" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Property Management</CardTitle>
                  <CardDescription>
                    Manage all property listings in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 bg-muted p-3 font-medium">
                      <div className="col-span-2">Property</div>
                      <div>Type</div>
                      <div>Status</div>
                      <div>Owner</div>
                      <div className="text-right">Actions</div>
                    </div>
                    
                    {properties.map((property) => (
                      <div key={property.id} className="grid grid-cols-6 p-3 border-t items-center">
                        <div className="col-span-2 font-medium">{property.title}</div>
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
                        <div>{property.owner}</div>
                        <div className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
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
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage user accounts and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 bg-muted p-3 font-medium">
                      <div className="col-span-2">User</div>
                      <div>Role</div>
                      <div>Status</div>
                      <div>Joined</div>
                      <div className="text-right">Actions</div>
                    </div>
                    
                    {users.map((user) => (
                      <div key={user.id} className="grid grid-cols-6 p-3 border-t items-center">
                        <div className="col-span-2">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                        <div>
                          {user.role === 'admin' ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <User className="h-3 w-3 mr-1" />
                              User
                            </span>
                          )}
                        </div>
                        <div>
                          {user.status === 'active' ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Inactive
                            </span>
                          )}
                        </div>
                        <div>{user.joined}</div>
                        <div className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleUpdateUserRole(user.id, user.role)}>
                                <UserCheck className="h-4 w-4 mr-2 text-blue-500" />
                                {user.role === 'admin' ? 'Change to User' : 'Make Admin'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
