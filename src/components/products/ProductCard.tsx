
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export type Product = {
  id: string;
  name: string;
  brand: string;
  image: string;
  ingredients: string[];
  allergens: string[];
};

interface ProductCardProps {
  product: Product;
  userAllergens?: string[];
  onClick?: () => void;
}

const ProductCard = ({ product, userAllergens = [], onClick }: ProductCardProps) => {
  const hasAllergens = userAllergens.some(allergen => 
    product.allergens.includes(allergen.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Card 
        className={`overflow-hidden transition-all duration-300 ${
          hasAllergens ? 'border-red-300 dark:border-red-800' : ''
        }`}
        onClick={onClick}
      >
        <div className="relative">
          <div className="w-full h-48 bg-muted overflow-hidden">
            <img 
              src={product.image || '/placeholder.svg'} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
          
          {hasAllergens && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive" className="flex items-center gap-1 px-2 py-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Contains Allergens</span>
              </Badge>
            </div>
          )}
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-balance text-lg">{product.name}</CardTitle>
              <CardDescription>{product.brand}</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-2 space-y-2">
          {hasAllergens ? (
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800/30">
              <div className="text-sm font-medium text-red-700 dark:text-red-300 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Contains allergens you're sensitive to</span>
              </div>
              <ul className="mt-1 text-xs text-red-600 dark:text-red-200 pl-5 list-disc">
                {product.allergens
                  .filter(allergen => userAllergens.includes(allergen.toLowerCase()))
                  .map((allergen, i) => (
                    <li key={i} className="capitalize">{allergen}</li>
                  ))
                }
              </ul>
            </div>
          ) : (
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800/30">
              <div className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>No detected allergens for your profile</span>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button variant="outline" className="w-full gap-1" onClick={onClick}>
            <Info className="w-4 h-4" />
            <span>View Details</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
