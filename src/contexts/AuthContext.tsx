
import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuthentication } from '@/hooks/useAuthentication';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAdminOperations } from '@/hooks/useAdminOperations';
import { AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { 
    user, 
    setUser, 
    isLoading, 
    isLoggedIn,
    login,
    logout,
    register,
    initializeAuth
  } = useAuthentication();
  
  const {
    addToFavorites,
    removeFromFavorites,
    isPropertyFavorite,
    addSearchQuery
  } = useUserProfile(user, setUser);
  
  const {
    isAdmin,
    removeProperty,
    updateUserRole
  } = useAdminOperations(user);
  
  // Initialize auth on component mount
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading,
        isLoggedIn,
        login, 
        logout, 
        register,
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
