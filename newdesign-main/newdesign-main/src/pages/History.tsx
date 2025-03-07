
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAllergyData, SafetyStatus } from "@/contexts/AllergyDataContext";
import { SafetyIndicator } from "@/components/ui/safety-indicator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Search, Heart, Filter, Trash2 } from "lucide-react";
import { format } from "date-fns";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<SafetyStatus | "all">("all");
  const { userAllergies } = useAuth();
  const { scannedProducts, checkSafety, removeProduct, toggleFavorite } = useAllergyData();

  // Format date from timestamp
  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), "MMM d, yyyy");
  };

  // Filter products based on search and safety filter
  const filteredProducts = scannedProducts.filter(product => {
    // Search by name
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by safety status if not 'all'
    if (filter !== "all") {
      const safety = checkSafety(
        product.ingredients,
        userAllergies.map(a => ({ name: a.name, severity: a.severity }))
      );
      return matchesSearch && safety === filter;
    }
    
    return matchesSearch;
  });

  return (
    <div className="container max-w-md mx-auto p-4">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Scan History</h1>
        <p className="text-muted-foreground">
          View and manage your previously scanned products
        </p>
      </div>
      
      {/* Search and filter */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setFilter("all")}
          >
            <Filter size={14} />
            All
          </Button>
          <Button
            variant={filter === "safe" ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-1 bg-green-600 text-white hover:bg-green-700"
            onClick={() => setFilter("safe")}
          >
            Safe
          </Button>
          <Button
            variant={filter === "may-contain" ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-1 bg-yellow-600 text-white hover:bg-yellow-700"
            onClick={() => setFilter("may-contain")}
          >
            May Contain
          </Button>
          <Button
            variant={filter === "dangerous" ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-1 bg-red-600 text-white hover:bg-red-700"
            onClick={() => setFilter("dangerous")}
          >
            Dangerous
          </Button>
        </div>
      </div>
      
      {/* Product list */}
      <div className="space-y-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => {
            const safetyStatus = checkSafety(
              product.ingredients,
              userAllergies.map(a => ({ name: a.name, severity: a.severity }))
            );
            
            return (
              <div key={product.id} className="border rounded-lg overflow-hidden bg-card">
                <Link to={`/product/${product.id}`} className="block hover:bg-muted/20">
                  <div className="flex items-start p-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock size={14} />
                        {formatDate(product.timestamp)}
                      </p>
                    </div>
                    
                    <SafetyIndicator status={safetyStatus} className="ml-2" />
                  </div>
                </Link>
                <div className="border-t flex">
                  <button
                    className="flex-1 p-2 text-sm flex items-center justify-center hover:bg-muted/20"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      size={16}
                      className={`mr-1 ${product.isFavorite ? "fill-primary text-primary" : ""}`}
                    />
                    {product.isFavorite ? "Favorited" : "Favorite"}
                  </button>
                  <div className="w-px bg-border" />
                  <button
                    className="flex-1 p-2 text-sm flex items-center justify-center hover:bg-destructive/10 text-destructive"
                    onClick={() => removeProduct(product.id)}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <p className="text-muted-foreground mb-2">No products found</p>
            <p className="text-sm text-muted-foreground">
              {scannedProducts.length === 0 
                ? "Start scanning products to build your history" 
                : "Try adjusting your search or filters"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
