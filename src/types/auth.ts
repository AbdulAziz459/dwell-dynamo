
// Define the shape of the user without password
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: 'user' | 'admin';
  favorites: string[];
  searchHistory: {
    query: string;
    timestamp: string;
  }[];
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  addToFavorites: (propertyId: string) => void;
  removeFromFavorites: (propertyId: string) => void;
  isPropertyFavorite: (propertyId: string) => boolean;
  addSearchQuery: (query: string) => void;
  isAdmin: () => boolean;
  removeProperty: (propertyId: string) => Promise<boolean>;
  updateUserRole: (userId: string, newRole: 'user' | 'admin') => Promise<boolean>;
}
