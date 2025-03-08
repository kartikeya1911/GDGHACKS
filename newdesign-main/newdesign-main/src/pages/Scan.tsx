import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAllergyData } from "@/contexts/AllergyDataContext";
import { Button } from "@/components/ui/button";
import { SafetyIndicator } from "@/components/ui/safety-indicator";
import { useToast } from "@/hooks/use-toast";
import { Camera, Image, Barcode, List, X, Check, AlertTriangle, RefreshCw } from "lucide-react";

const Scan = () => {
  const [activeTab, setActiveTab] = useState<"barcode" | "image">("barcode");
  const [isScanning, setIsScanning] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState<string | null>(null);
  const { userAllergies } = useAuth();
  const { addProduct, checkSafety } = useAllergyData();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock function to simulate barcode scanning
  const handleScanBarcode = () => {
    setIsScanning(true);
    
    // Simulate a delay for scanning
    setTimeout(() => {
      setIsScanning(false);
      
      // Mock data for testing
      const mockProduct = {
        name: "Chocolate Chip Cookies",
        ingredients: [
          "Wheat Flour",
          "Sugar",
          "Chocolate Chips (Cocoa Mass, Sugar, Cocoa Butter, Emulsifier (Soya Lecithin))",
          "Butter",
          "Eggs",
          "Baking Soda",
          "Salt",
          "May contain traces of nuts"
        ]
      };
      
      setProductName(mockProduct.name);
      setIngredients(mockProduct.ingredients);
      
      toast({
        title: "Product scanned",
        description: `Found: ${mockProduct.name}`,
      });
    }, 2000);
  };

  // Mock function to simulate image upload and ingredient extraction
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create a preview of the image
    const reader = new FileReader();
    reader.onload = () => {
      setProductImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Simulate processing delay
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      
      // Mock extraction results
      const mockExtractedIngredients = [
        "Milk",
        "Cream",
        "Sugar",
        "Cocoa Powder",
        "Vanilla Extract",
        "Egg Yolks",
        "Lecithin",
        "Natural Flavors"
      ];
      
      setProductName("Vanilla Ice Cream");
      setIngredients(mockExtractedIngredients);
      
      toast({
        title: "Ingredients extracted",
        description: "Successfully read ingredients from image",
      });
    }, 2000);
  };

  // Save the scanned product and navigate to details
  const handleSaveProduct = () => {
    if (!productName || ingredients.length === 0) {
      toast({
        title: "Missing information",
        description: "Please ensure the product has a name and ingredients",
        variant: "destructive",
      });
      return;
    }
    
    const newProduct = {
      name: productName,
      ingredients,
      image: productImage || undefined,
    };
    
    addProduct(newProduct);
    
    toast({
      title: "Product saved",
      description: "The product has been added to your history",
    });
    
    // Navigate to history page
    navigate("/history");
  };

  // Calculate safety status
  const safetyStatus = ingredients.length > 0
    ? checkSafety(
        ingredients,
        userAllergies.map(a => ({ name: a.name, severity: a.severity }))
      )
    : "safe";

  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Scan Product</h1>
        <p className="text-muted-foreground">
          Scan barcode or take a photo of the ingredients list
        </p>
      </div>
      
      {/* Scan method tabs */}
      <div className="flex border rounded-lg overflow-hidden">
        <button
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium ${
            activeTab === "barcode"
              ? "bg-primary text-primary-foreground"
              : "bg-card hover:bg-secondary/50"
          }`}
          onClick={() => setActiveTab("barcode")}
        >
          <Barcode size={16} />
          Barcode
        </button>
        <button
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium ${
            activeTab === "image"
              ? "bg-primary text-primary-foreground"
              : "bg-card hover:bg-secondary/50"
          }`}
          onClick={() => setActiveTab("image")}
        >
          <Image size={16} />
          Image
        </button>
      </div>
      
      {/* Scanner area */}
      <div className="border rounded-lg p-4 bg-card">
        {activeTab === "barcode" ? (
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-full aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
              {isScanning ? (
                <div className="animate-pulse">Scanning...</div>
              ) : (
                <Camera size={40} className="text-muted-foreground" />
              )}
            </div>
            <Button
              size="lg"
              className="gap-2"
              onClick={handleScanBarcode}
              disabled={isScanning}
            >
              <Barcode size={16} />
              {isScanning ? "Scanning..." : "Scan Barcode"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-full aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
              {productImage ? (
                <img
                  src={productImage}
                  alt="Uploaded ingredients"
                  className="w-full h-full object-cover"
                />
              ) : isScanning ? (
                <div className="animate-pulse">Processing image...</div>
              ) : (
                <Image size={40} className="text-muted-foreground" />
              )}
            </div>
            <label className="block w-full">
              <Button size="lg" className="gap-2 w-full" disabled={isScanning}>
                <Image size={16} />
                {isScanning ? "Processing..." : "Upload Image"}
              </Button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isScanning}
              />
            </label>
          </div>
        )}
      </div>
      
      {/* Results section - only shown if ingredients are detected */}
      {ingredients.length > 0 && (
        <div className="border rounded-lg p-4 bg-card space-y-4">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-medium">{productName}</h2>
            <SafetyIndicator status={safetyStatus} />
          </div>
          
          <div>
            <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
              <List size={16} />
              Ingredients
            </h3>
            <div className="text-sm border rounded-md p-3 bg-muted/30 max-h-40 overflow-y-auto">
              <ul className="space-y-1 list-disc pl-5">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <Button onClick={handleSaveProduct} className="w-full">
            Save Product
          </Button>
        </div>
      )}
      {/* Add Contribute Button - Fixed at bottom center */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center">
        <Link to="/contributors">
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-md px-6 py-2 shadow-lg flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            <span>Contribute Missing Item</span>
          </Button>
        </Link>
      </div>
    </div>

    
  );
};

export default Scan;
