
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAllergyData } from "@/contexts/AllergyDataContext";
import { SafetyIndicator } from "@/components/ui/safety-indicator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Clock,
  Image as ImageIcon,
  AlertCircle,
  Check,
  AlertTriangle,
  List,
  Save,
} from "lucide-react";
import { format } from "date-fns";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userAllergies } = useAuth();
  const { scannedProducts, checkSafety, toggleFavorite, updateNotes, removeProduct } = useAllergyData();
  const { toast } = useToast();
  
  // Find the product
  const product = scannedProducts.find(p => p.id === id);
  
  // Redirect if product not found
  if (!product) {
    navigate("/history");
    return null;
  }
  
  // Local state for notes editing
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(product.notes || "");
  
  // Calculate safety status
  const safetyStatus = checkSafety(
    product.ingredients,
    userAllergies.map(a => ({ name: a.name, severity: a.severity }))
  );
  
  // Format date
  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), "MMMM d, yyyy 'at' h:mm a");
  };
  
  // Save notes
  const handleSaveNotes = () => {
    updateNotes(product.id, notes);
    setIsEditingNotes(false);
    toast({
      title: "Notes saved",
      description: "Your notes have been updated",
    });
  };
  
  // Delete product
  const handleDelete = () => {
    removeProduct(product.id);
    toast({
      title: "Product removed",
      description: "The product has been removed from your history",
    });
    navigate("/history");
  };
  
  // Safety messages based on status
  const getSafetyMessage = () => {
    switch (safetyStatus) {
      case "safe":
        return "This product appears to be safe based on your allergy profile.";
      case "may-contain":
        return "This product may contain allergens or traces of allergens in your profile.";
      case "dangerous":
        return "Warning: This product contains allergens that you have listed as severe.";
      default:
        return "";
    }
  };
  
  const getSafetyIcon = () => {
    switch (safetyStatus) {
      case "safe":
        return <Check className="h-5 w-5 text-green-600" />;
      case "may-contain":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "dangerous":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-md mx-auto p-4 pb-20">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">Product Details</h1>
      </div>
      
      <div className="space-y-6">
        {/* Product image (if available) */}
        {product.image ? (
          <div className="w-full h-48 rounded-lg overflow-hidden border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-48 rounded-lg border flex items-center justify-center bg-muted/30">
            <ImageIcon size={40} className="text-muted-foreground" />
          </div>
        )}
        
        {/* Product name and actions */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <SafetyIndicator status={safetyStatus} />
          </div>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock size={14} />
            Scanned on {formatDate(product.timestamp)}
          </p>
          
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              className="flex-1 flex items-center gap-2"
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart
                size={16}
                className={product.isFavorite ? "fill-primary text-primary" : ""}
              />
              {product.isFavorite ? "Favorited" : "Favorite"}
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex items-center gap-2"
              onClick={() => {
                navigator.clipboard.writeText(product.name);
                toast({
                  title: "Copied to clipboard",
                  description: "Product name copied to clipboard",
                });
              }}
            >
              <ShoppingCart size={16} />
              Add to List
            </Button>
          </div>
        </div>
        
        {/* Safety warning */}
        <div className={`p-4 rounded-lg border flex items-start gap-3
          ${safetyStatus === "safe" ? "bg-green-50 border-green-200" : ""}
          ${safetyStatus === "may-contain" ? "bg-yellow-50 border-yellow-200" : ""}
          ${safetyStatus === "dangerous" ? "bg-red-50 border-red-200" : ""}
        `}>
          {getSafetyIcon()}
          <div>
            <p className="font-medium text-sm">
              {safetyStatus === "safe" ? "Safe to Consume" : ""}
              {safetyStatus === "may-contain" ? "Use Caution" : ""}
              {safetyStatus === "dangerous" ? "Not Safe" : ""}
            </p>
            <p className="text-sm mt-1">{getSafetyMessage()}</p>
          </div>
        </div>
        
        {/* Ingredients */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <List size={18} />
            Ingredients
          </h3>
          <div className="p-4 border rounded-lg bg-muted/10">
            <ul className="space-y-1 list-disc pl-5">
              {product.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm">{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Notes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Notes</h3>
            {!isEditingNotes && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditingNotes(true)}
              >
                Edit
              </Button>
            )}
          </div>
          
          {isEditingNotes ? (
            <div className="space-y-2">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your notes about this product..."
                className="min-h-[100px]"
              />
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setIsEditingNotes(false);
                    setNotes(product.notes || "");
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleSaveNotes}
                >
                  <Save size={14} />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 border rounded-lg bg-muted/10 min-h-[80px]">
              {product.notes ? (
                <p className="text-sm">{product.notes}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No notes added yet. Click edit to add notes.
                </p>
              )}
            </div>
          )}
        </div>
        
        {/* Delete button */}
        <Button
          variant="destructive"
          className="w-full mt-8"
          onClick={handleDelete}
        >
          Delete from History
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
