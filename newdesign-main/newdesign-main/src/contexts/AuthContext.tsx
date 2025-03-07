
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define user type
interface User {
  id: string;
  email: string;
  phone?: string;
  name?: string;
}

// Define allergen severity types
export type AllergySeverity = "mild" | "moderate" | "severe";

// Define allergen type
export interface Allergen {
  id: string;
  name: string;
  severity: AllergySeverity;
}

// Define user context state
interface AuthContextType {
  user: User | null;
  userAllergies: Allergen[];
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, phone?: string) => Promise<void>;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;
  addAllergen: (allergen: Omit<Allergen, "id">) => void;
  updateAllergen: (allergen: Allergen) => void;
  removeAllergen: (id: string) => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  userAllergies: [],
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
  updateUser: () => {},
  addAllergen: () => {},
  updateAllergen: () => {},
  removeAllergen: () => {},
});

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userAllergies, setUserAllergies] = useState<Allergen[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    // Simulate loading user from localStorage
    const storedUser = localStorage.getItem("user");
    const storedAllergies = localStorage.getItem("allergies");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedAllergies) {
      setUserAllergies(JSON.parse(storedAllergies));
    }
    
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever user or allergies change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    
    localStorage.setItem("allergies", JSON.stringify(userAllergies));
  }, [user, userAllergies]);

  // Auth methods
  const signIn = async (email: string, password: string) => {
    // Simulate auth API call
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to authenticate
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name: email.split('@')[0],
      };
      
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, phone?: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to register
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        phone,
        name: email.split('@')[0],
      };
      
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({
        ...user,
        ...userData,
      });
    }
  };

  // Allergen management
  const addAllergen = (allergen: Omit<Allergen, "id">) => {
    const newAllergen: Allergen = {
      ...allergen,
      id: Math.random().toString(36).substring(2, 9),
    };
    
    setUserAllergies(prev => [...prev, newAllergen]);
  };

  const updateAllergen = (allergen: Allergen) => {
    setUserAllergies(prev => 
      prev.map(item => item.id === allergen.id ? allergen : item)
    );
  };

  const removeAllergen = (id: string) => {
    setUserAllergies(prev => prev.filter(item => item.id !== id));
  };

  const value = {
    user,
    userAllergies,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser,
    addAllergen,
    updateAllergen,
    removeAllergen,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
