
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { authenticateUser, users } from '@/lib/data';
import { AuthUser } from '@/types/auth';

export const useAuthentication = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Check for saved user on initial load
  const initializeAuth = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = authenticateUser(email, password);
      if (result.success && result.user) {
        // Determine role based on email
        const role = email.includes('admin') ? 'admin' : 'user';
        
        setUser({
          ...result.user as AuthUser,
          role // Set the role based on email
        });
        
        localStorage.setItem('user', JSON.stringify({
          ...result.user,
          role
        }));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${result.user.name}! You're logged in as ${role}.`,
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
      
      // Determine role based on email (for demo purposes)
      const role = email.includes('admin') ? 'admin' : 'user';
      
      // In a real app, this would be a server call to create a new user
      // For this demo, we'll just create a new user object
      const newUser: AuthUser = {
        id: `u${users.length + 1}`,
        name,
        email,
        role,
        favorites: [],
        searchHistory: []
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}! You've been registered as a ${role}.`,
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

  return {
    user,
    setUser,
    isLoading,
    isLoggedIn: user !== null,
    login,
    logout,
    register,
    initializeAuth
  };
};
