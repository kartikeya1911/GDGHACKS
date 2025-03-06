
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BarcodeScanner from '@/components/scanner/BarcodeScanner';
import ProductCard, { Product } from '@/components/products/ProductCard';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock user allergens
const userAllergens = ['peanuts', 'tree nuts', 'gluten'];

// Mock product database
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

const ScanPage = () => {
  const navigate = useNavigate();
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [scanHistory, setScanHistory] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('scanner');

  const handleBarcodeScan = (barcode: string) => {
    console.log('Scanned barcode:', barcode);
    
    // Look up the product in our "database"
    const foundProduct = mockProducts[barcode];
    
    if (foundProduct) {
      setScannedProduct(foundProduct);
      setScanHistory(prev => {
        // Add to history if not already there
        if (!prev.some(p => p.id === foundProduct.id)) {
          return [foundProduct, ...prev];
        }
        return prev;
      });
      
      // Check for allergens
      const allergenWarnings = userAllergens.filter(allergen => 
        foundProduct.allergens.includes(allergen)
      );
      
      if (allergenWarnings.length > 0) {
        toast.error(`Warning: This product contains ${allergenWarnings.join(', ')}`, {
          duration: 5000,
        });
      } else {
        toast.success('No allergens detected for your profile!');
      }
      
      // Switch to results tab
      setActiveTab('result');
    } else {
      toast.error('Product not found in our database', {
        description: 'Would you like to add it?',
        action: {
          label: 'Add Product',
          onClick: () => {
            toast.info('Product submission form would open here.');
          },
        },
      });
    }
  };

  const handleViewProductDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <MainLayout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Scan Barcode</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="scanner">Scanner</TabsTrigger>
            <TabsTrigger value="result">Result</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scanner" className="focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BarcodeScanner onScan={handleBarcodeScan} />
              
              <div className="text-center mt-8">
                <p className="text-muted-foreground text-sm">
                  Point your camera at a product barcode to scan.
                  <br />
                  Make sure the barcode is well-lit and clearly visible.
                </p>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="result" className="focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {scannedProduct ? (
                <>
                  <h2 className="text-xl font-medium mb-4">Scan Result</h2>
                  <ProductCard 
                    product={scannedProduct} 
                    userAllergens={userAllergens}
                    onClick={() => handleViewProductDetails(scannedProduct.id)}
                  />
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No recent scan results</p>
                </div>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="history" className="focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-medium mb-4">Scan History</h2>
              
              {scanHistory.length > 0 ? (
                <div className="space-y-6">
                  {scanHistory.map((product) => (
                    <ProductCard 
                      key={product.id}
                      product={product} 
                      userAllergens={userAllergens}
                      onClick={() => handleViewProductDetails(product.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Your scan history will appear here</p>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ScanPage;
