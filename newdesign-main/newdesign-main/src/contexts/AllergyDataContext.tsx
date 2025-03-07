
import React, { createContext, useContext, useState, ReactNode } from "react";
import { AllergySeverity } from "./AuthContext";

// Product types
export interface Ingredient {
  id: string;
  name: string;
  aliases?: string[];
}

export interface Product {
  id: string;
  name: string;
  barcode?: string;
  ingredients: string[];
  image?: string;
  timestamp: number;
  notes?: string;
  isFavorite?: boolean;
}

export type SafetyStatus = "safe" | "may-contain" | "dangerous";

// Common allergens for search
export const COMMON_ALLERGENS: Ingredient[] = [
  { id: "1", name: "Peanuts", aliases: ["peanut", "arachis", "groundnut"] },
  { id: "2", name: "Tree Nuts", aliases: ["almond", "hazelnut", "walnut", "cashew", "pecan", "brazil nut"] },
  { id: "3", name: "Milk", aliases: ["dairy", "lactose", "whey", "casein", "butter", "cream"] },
  { id: "4", name: "Eggs", aliases: ["egg", "albumin", "ovalbumin", "globulin", "ovomucin"] },
  { id: "5", name: "Fish", aliases: ["cod", "salmon", "tuna", "hake", "bass"] },
  { id: "6", name: "Shellfish", aliases: ["crab", "lobster", "shrimp", "prawn", "crayfish", "squid"] },
  { id: "7", name: "Wheat", aliases: ["flour", "bread", "bran", "starch", "gluten"] },
  { id: "8", name: "Soy", aliases: ["soya", "tofu", "soybean", "miso", "edamame"] },
  { id: "9", name: "Sesame", aliases: ["tahini", "sesame seed", "sesame oil"] },
  { id: "10", name: "Mustard", aliases: ["mustard seed", "mustard powder"] },
  { id: "11", name: "Celery", aliases: ["celery root", "celeriac", "celery seed"] },
  { id: "12", name: "Lupin", aliases: ["lupine", "lupin flour", "lupin bean"] },
  { id: "13", name: "Sulphites", aliases: ["sulfites", "sulphur dioxide", "E220"] },
  { id: "14", name: "Gluten", aliases: ["wheat", "barley", "rye", "oats", "spelt", "kamut"] },
];

interface AllergyDataContextType {
  scannedProducts: Product[];
  addProduct: (product: Omit<Product, "id" | "timestamp">) => void;
  removeProduct: (id: string) => void;
  updateProduct: (product: Product) => void;
  toggleFavorite: (id: string) => void;
  updateNotes: (id: string, notes: string) => void;
  checkSafety: (ingredients: string[], userAllergens: { name: string; severity: AllergySeverity }[]) => SafetyStatus;
}

const AllergyDataContext = createContext<AllergyDataContextType>({
  scannedProducts: [],
  addProduct: () => {},
  removeProduct: () => {},
  updateProduct: () => {},
  toggleFavorite: () => {},
  updateNotes: () => {},
  checkSafety: () => "safe",
});

export const AllergyDataProvider = ({ children }: { children: ReactNode }) => {
  const [scannedProducts, setScannedProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem("scannedProducts");
    return stored ? JSON.parse(stored) : [];
  });

  // Save products to localStorage when updated
  React.useEffect(() => {
    localStorage.setItem("scannedProducts", JSON.stringify(scannedProducts));
  }, [scannedProducts]);

  const addProduct = (product: Omit<Product, "id" | "timestamp">) => {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    };
    
    setScannedProducts(prev => [newProduct, ...prev]);
  };

  const removeProduct = (id: string) => {
    setScannedProducts(prev => prev.filter(product => product.id !== id));
  };

  const updateProduct = (product: Product) => {
    setScannedProducts(prev => 
      prev.map(item => item.id === product.id ? product : item)
    );
  };

  const toggleFavorite = (id: string) => {
    setScannedProducts(prev => 
      prev.map(product => 
        product.id === id 
          ? { ...product, isFavorite: !product.isFavorite } 
          : product
      )
    );
  };

  const updateNotes = (id: string, notes: string) => {
    setScannedProducts(prev => 
      prev.map(product => 
        product.id === id 
          ? { ...product, notes } 
          : product
      )
    );
  };

  // Check if an ingredient matches or partially matches an allergen
  const matchIngredientToAllergen = (ingredient: string, allergen: { name: string; severity: AllergySeverity }) => {
    const allergenInfo = COMMON_ALLERGENS.find(a => 
      a.name.toLowerCase() === allergen.name.toLowerCase()
    );
    
    if (!allergenInfo) return false;
    
    // Check direct name match
    if (ingredient.toLowerCase().includes(allergen.name.toLowerCase())) {
      return true;
    }
    
    // Check aliases
    if (allergenInfo.aliases) {
      return allergenInfo.aliases.some(alias => 
        ingredient.toLowerCase().includes(alias.toLowerCase())
      );
    }
    
    return false;
  };

  // Check product safety against user allergies
  const checkSafety = (ingredients: string[], userAllergens: { name: string; severity: AllergySeverity }[]): SafetyStatus => {
    // If no allergies or no ingredients, it's safe
    if (!userAllergens.length || !ingredients.length) {
      return "safe";
    }

    // Check for direct allergen matches
    const directMatches = userAllergens.filter(allergen => 
      ingredients.some(ingredient => matchIngredientToAllergen(ingredient, allergen))
    );

    // If any severe allergens match, it's dangerous
    if (directMatches.some(allergen => allergen.severity === "severe")) {
      return "dangerous";
    }

    // If any allergens match, it's at least "may contain"
    if (directMatches.length > 0) {
      return "may-contain";
    }

    // Check for "may contain" statements in ingredients
    const mayContainMatch = ingredients.some(ingredient => 
      ingredient.toLowerCase().includes("may contain") && 
      userAllergens.some(allergen => matchIngredientToAllergen(ingredient, allergen))
    );

    return mayContainMatch ? "may-contain" : "safe";
  };

  const value = {
    scannedProducts,
    addProduct,
    removeProduct,
    updateProduct,
    toggleFavorite,
    updateNotes,
    checkSafety,
  };

  return <AllergyDataContext.Provider value={value}>{children}</AllergyDataContext.Provider>;
};

export const useAllergyData = () => useContext(AllergyDataContext);
