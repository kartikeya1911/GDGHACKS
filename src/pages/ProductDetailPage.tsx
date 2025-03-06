
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, AlertTriangle, Info, Star, Plus, Share2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Product } from '@/components/products/ProductCard';

// Mock user allergens
const userAllergens = ['peanuts', 'tree nuts', 'gluten'];

// Mock product database - same as in ScanPage
const mockProducts: Record<string, Product> = {
  '5449000000996': {
    id: '5449000000996',
    name: 'Coca-Cola Classic',
    brand: 'Coca-Cola',
    image: 'https://images.unsplash.com/photo-1629203432180-71e9b18d33e3?q=80&w=1974&auto=format&fit=crop',
    ingredients: ['Carbonated Water', 'Sugar', 'Color (Caramel E150d)', 'Phosphoric Acid', 'Natural Flavors', 'Caffeine'],
    allergens: [],
  },
  '8076800195057': {
    id: '8076800195057',
    name: 'Wholegrain Pasta',
    brand: 'Barilla',
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?q=80&w=2068&auto=format&fit=crop',
    ingredients: ['Whole Durum Wheat Semolina'],
    allergens: ['wheat', 'gluten'],
  },
  '3017620422003': {
    id: '3017620422003',
    name: 'Chocolate Hazelnut Spread',
    brand: 'Nutella',
    image: 'https://images.unsplash.com/photo-1604153705817-22a0da7809c9?q=80&w=2070&auto=format&fit=crop',
    ingredients: ['Sugar', 'Palm Oil', 'Hazelnuts', 'Cocoa Powder', 'Skim Milk Powder', 'Vanillin'],
    allergens: ['hazelnuts', 'tree nuts', 'milk'],
  },
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the product by ID
  const product = id ? mockProducts[id] : null;
  
  if (!product) {
    return (
      <MainLayout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6 text-muted-foreground">The product you're looking for doesn't exist in our database.</p>
          <Button onClick={() => navigate('/scan')}>Scan Another Product</Button>
        </div>
      </MainLayout>
    );
  }
  
  // Check for allergens in the product that match user's allergens
  const matchedAllergens = userAllergens.filter(allergen => 
    product.allergens.includes(allergen)
  );
  
  const hasAllergens = matchedAllergens.length > 0;
  
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4 -ml-2" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="relative mb-6">
          <div className="w-full h-64 sm:h-80 bg-muted rounded-2xl overflow-hidden">
            <motion.img 
              src={product.image || '/placeholder.svg'} 
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
            />
          </div>
          
          {hasAllergens && (
            <div className="absolute top-4 right-4">
              <Badge variant="destructive" className="px-3 py-1.5 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                <span>Contains Allergens</span>
              </Badge>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="text-muted-foreground">{product.brand}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toast.success('Product saved to favorites')}
                >
                  <Star className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toast.success('Share link copied to clipboard')}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Allergen Alert */}
            {hasAllergens ? (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/30">
                <div className="text-sm font-medium text-red-700 dark:text-red-300 flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Warning: Contains allergens you're sensitive to</p>
                    <ul className="mt-1 pl-5 list-disc">
                      {matchedAllergens.map((allergen, i) => (
                        <li key={i} className="capitalize">{allergen}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800/30">
                <div className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>No allergens detected for your profile</span>
                </div>
              </div>
            )}
          </div>
          
          <Tabs defaultValue="ingredients">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients" className="space-y-4 pt-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-3">Ingredients</h3>
                  <p className="text-muted-foreground">
                    {product.ingredients.join(', ')}
                  </p>
                  
                  <h3 className="text-lg font-medium mt-6 mb-3">Allergens</h3>
                  {product.allergens.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {product.allergens.map((allergen, i) => (
                        <Badge 
                          key={i} 
                          variant={userAllergens.includes(allergen) ? "destructive" : "secondary"}
                          className="capitalize"
                        >
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No allergens declared by manufacturer</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details" className="space-y-4 pt-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-3">Product Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Barcode</span>
                      <span className="font-medium">{product.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Brand</span>
                      <span className="font-medium">{product.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span className="font-medium">Today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Button
            className="w-full flex items-center gap-2 mt-4"
            onClick={() => {
              toast.info('You can suggest changes to this product information', {
                description: 'Our contributors help keep our database accurate',
                action: {
                  label: 'Submit Edit',
                  onClick: () => {
                    toast.success('Edit submission form would open here');
                  }
                }
              });
            }}
          >
            <Plus className="h-4 w-4" />
            <span>Suggest Edits</span>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
