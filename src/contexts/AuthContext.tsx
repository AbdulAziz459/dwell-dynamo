
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { authenticateUser, users } from '@/lib/data';

// Define the shape of the user without password
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role?: 'user' | 'admin';
  favorites: string[];
  searchHistory: {
    query: string;
    timestamp: string;
  }[];
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  googleSignIn: () => Promise<boolean>;
  addToFavorites: (propertyId: string) => void;
  removeFromFavorites: (propertyId: string) => void;
  isPropertyFavorite: (propertyId: string) => boolean;
  addSearchQuery: (query: string) => void;
  isAdmin: () => boolean;
  removeProperty: (propertyId: string) => Promise<boolean>;
  updateUserRole: (userId: string, newRole: 'user' | 'admin') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = authenticateUser(email, password);
      if (result.success && result.user) {
        setUser({
          ...result.user as AuthUser,
          role: email.includes('admin') ? 'admin' : 'user' // Simple role assignment for demo
        });
        localStorage.setItem('user', JSON.stringify({
          ...result.user,
          role: email.includes('admin') ? 'admin' : 'user'
        }));
        toast({
          title: "Login successful",
          description: `Welcome back, ${result.user.name}!`,
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: result.message || "Invalid email or password",
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Email already exists. Please use a different email or log in.",
        });
        return false;
      }
      
      // In a real app, this would be a server call to create a new user
      // For this demo, we'll just create a new user object
      const newUser: AuthUser = {
        id: `u${users.length + 1}`,
        name,
        email,
        role: 'user', // Default role
        favorites: [],
        searchHistory: []
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An unexpected error occurred.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Simulated Google sign-in
  const googleSignIn = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate network delay for the OAuth process
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock Google user data
      const googleUser: AuthUser = {
        id: `g${Date.now()}`,
        name: "Google User",
        email: `user${Math.floor(Math.random() * 1000)}@gmail.com`,
        image: "https://lh3.googleusercontent.com/a/default-user",
        role: 'user',
        favorites: [],
        searchHistory: []
      };
      
      setUser(googleUser);
      localStorage.setItem('user', JSON.stringify(googleUser));
      
      toast({
        title: "Google Sign-in successful",
        description: `Welcome, ${googleUser.name}!`,
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google Sign-in failed",
        description: "An error occurred during Google authentication.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = (propertyId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      favorites: [...user.favorites, propertyId]
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    toast({
      title: "Added to Favorites",
      description: "Property added to your favorites.",
    });
  };

  const removeFromFavorites = (propertyId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      favorites: user.favorites.filter(id => id !== propertyId)
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    toast({
      title: "Removed from Favorites",
      description: "Property removed from your favorites.",
    });
  };

  const isPropertyFavorite = (propertyId: string): boolean => {
    return user ? user.favorites.includes(propertyId) : false;
  };

  const addSearchQuery = (query: string) => {
    if (!user) return;
    
    const newSearchQuery = {
      query,
      timestamp: new Date().toISOString()
    };
    
    const updatedUser = {
      ...user,
      searchHistory: [newSearchQuery, ...user.searchHistory.slice(0, 9)] // Keep last 10 searches
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  // Check if the current user has admin role
  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };
  
  // Admin function to remove a property listing
  const removeProperty = async (propertyId: string): Promise<boolean> => {
    if (!isAdmin()) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "Only administrators can remove property listings.",
      });
      return false;
    }
    
    try {
      // In a real app, this would be an API call to remove the property
      // For this demo, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Property Removed",
        description: "The property listing has been successfully removed.",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove the property listing.",
      });
      return false;
    }
  };
  
  // Admin function to update a user's role
  const updateUserRole = async (userId: string, newRole: 'user' | 'admin'): Promise<boolean> => {
    if (!isAdmin()) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "Only administrators can update user roles.",
      });
      return false;
    }
    
    try {
      // In a real app, this would be an API call to update the user's role
      // For this demo, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Role Updated",
        description: `User role has been updated to ${newRole}.`,
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user role.",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        logout, 
        register,
        googleSignIn,
        addToFavorites, 
        removeFromFavorites, 
        isPropertyFavorite, 
        addSearchQuery,
        isAdmin,
        removeProperty,
        updateUserRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
