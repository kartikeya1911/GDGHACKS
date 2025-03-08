import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const Contributors: React.FC = () => {
  // State for allergen contribution
  const [allergenData, setAllergenData] = useState({
    name: "",
    email: "",
    allergen: "",
    description: "",
  });
  
  // State for food item contribution
  const [foodItemData, setFoodItemData] = useState({
    name: "",
    email: "",
    productName: "",
    brand: "",
    barcode: "",
    ingredients: [] as string[],
    knownAllergens: [] as string[],
    notes: "",
  });
  
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentAllergen, setCurrentAllergen] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Allergen form handlers
  const handleAllergenChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAllergenData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Food item form handlers
  const handleFoodItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFoodItemData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== "" && !foodItemData.ingredients.includes(currentIngredient.trim())) {
      setFoodItemData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, currentIngredient.trim()]
      }));
      setCurrentIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setFoodItemData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(item => item !== ingredient)
    }));
  };

  const handleAddAllergen = () => {
    if (currentAllergen.trim() !== "" && !foodItemData.knownAllergens.includes(currentAllergen.trim())) {
      setFoodItemData(prev => ({
        ...prev,
        knownAllergens: [...prev.knownAllergens, currentAllergen.trim()]
      }));
      setCurrentAllergen("");
    }
  };

  const handleRemoveAllergen = (allergen: string) => {
    setFoodItemData(prev => ({
      ...prev,
      knownAllergens: prev.knownAllergens.filter(item => item !== allergen)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitAllergen = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Submitted allergen data:", allergenData);
    console.log("Image file:", imageFile);
    setSubmitted(true);
    
    // Reset form after submission
    setAllergenData({
      name: "",
      email: "",
      allergen: "",
      description: "",
    });
    setImageFile(null);
    setImagePreview(null);
    
    // Reset submission status after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleSubmitFoodItem = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Submitted food item data:", foodItemData);
    console.log("Image file:", imageFile);
    setSubmitted(true);
    
    // Reset form after submission
    setFoodItemData({
      name: "",
      email: "",
      productName: "",
      brand: "",
      barcode: "",
      ingredients: [],
      knownAllergens: [],
      notes: "",
    });
    setImageFile(null);
    setImagePreview(null);
    
    // Reset submission status after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-6 py-12">
      {/* Header Section */}
      <h1 className="text-white text-3xl font-bold">Contribute to Our Database</h1>
      <p className="text-gray-400 text-center mt-2 max-w-xl mb-8">
        Help us expand our database by sharing information about food items, ingredients, and allergens.
        Your contribution helps make meals safer for everyone.
      </p>

      {/* Form Section with Tabs */}
      <Card className="w-full max-w-2xl p-6 bg-gray-800 rounded-2xl">
        <Tabs defaultValue="food-item" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="food-item">Add Food Item</TabsTrigger>
            <TabsTrigger value="allergen">Add Allergen</TabsTrigger>
          </TabsList>
          
          {/* Food Item Tab */}
          <TabsContent value="food-item">
            <form onSubmit={handleSubmitFoodItem}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name-food" className="block text-sm font-medium text-white mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name-food"
                      name="name"
                      value={foodItemData.name}
                      onChange={handleFoodItemChange}
                      placeholder="Enter your name"
                      className="w-full bg-gray-700 text-white border-gray-600"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email-food" className="block text-sm font-medium text-white mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email-food"
                      name="email"
                      type="email"
                      value={foodItemData.email}
                      onChange={handleFoodItemChange}
                      placeholder="your.email@example.com"
                      className="w-full bg-gray-700 text-white border-gray-600"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="productName" className="block text-sm font-medium text-white mb-1">
                      Product Name
                    </label>
                    <Input
                      id="productName"
                      name="productName"
                      value={foodItemData.productName}
                      onChange={handleFoodItemChange}
                      placeholder="Enter product name"
                      className="w-full bg-gray-700 text-white border-gray-600"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-white mb-1">
                      Brand (Optional)
                    </label>
                    <Input
                      id="brand"
                      name="brand"
                      value={foodItemData.brand}
                      onChange={handleFoodItemChange}
                      placeholder="Enter brand name"
                      className="w-full bg-gray-700 text-white border-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="barcode" className="block text-sm font-medium text-white mb-1">
                    Barcode (Optional)
                  </label>
                  <Input
                    id="barcode"
                    name="barcode"
                    value={foodItemData.barcode}
                    onChange={handleFoodItemChange}
                    placeholder="Enter product barcode"
                    className="w-full bg-gray-700 text-white border-gray-600"
                  />
                </div>

                <div>
                  <label htmlFor="ingredients" className="block text-sm font-medium text-white mb-1">
                    Ingredients
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      id="ingredients"
                      value={currentIngredient}
                      onChange={(e) => setCurrentIngredient(e.target.value)}
                      placeholder="Enter an ingredient"
                      className="w-full bg-gray-700 text-white border-gray-600"
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddIngredient}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Add
                    </Button>
                  </div>
                  
                  {/* Ingredients List */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {foodItemData.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1 p-1.5">
                        {ingredient}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveIngredient(ingredient)}
                          className="ml-1 text-xs rounded-full hover:bg-gray-700 p-0.5"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="knownAllergens" className="block text-sm font-medium text-white mb-1">
                    Known Allergens (if any)
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      id="knownAllergens"
                      value={currentAllergen}
                      onChange={(e) => setCurrentAllergen(e.target.value)}
                      placeholder="Enter an allergen"
                      className="w-full bg-gray-700 text-white border-gray-600"
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddAllergen}
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      Add
                    </Button>
                  </div>
                  
                  {/* Allergens List */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {foodItemData.knownAllergens.map((allergen, index) => (
                      <Badge key={index} variant="destructive" className="flex items-center gap-1 p-1.5">
                        {allergen}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveAllergen(allergen)}
                          className="ml-1 text-xs rounded-full hover:bg-red-700 p-0.5"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-white mb-1">
                    Additional Notes
                  </label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={foodItemData.notes}
                    onChange={handleFoodItemChange}
                    placeholder="Any additional details about this food item"
                    className="w-full bg-gray-700 text-white border-gray-600 min-h-[100px]"
                  />
                </div>

                <div>
                  <label htmlFor="image-food" className="block text-sm font-medium text-white mb-1">
                    Upload Product Image (optional)
                  </label>
                  <Input
                    id="image-food"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full bg-gray-700 text-white border-gray-600"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full max-h-40 object-contain rounded-md"
                      />
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white py-2"
                >
                  Submit Food Item
                </Button>
              </div>
            </form>
          </TabsContent>
          
          {/* Allergen Tab */}
          <TabsContent value="allergen">
            <form onSubmit={handleSubmitAllergen}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name-allergen" className="block text-sm font-medium text-white mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name-allergen"
                    name="name"
                    value={allergenData.name}
                    onChange={handleAllergenChange}
                    placeholder="Enter your name"
                    className="w-full bg-gray-700 text-white border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email-allergen" className="block text-sm font-medium text-white mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email-allergen"
                    name="email"
                    type="email"
                    value={allergenData.email}
                    onChange={handleAllergenChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-gray-700 text-white border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="allergen" className="block text-sm font-medium text-white mb-1">
                    Allergen Name
                  </label>
                  <Input
                    id="allergen"
                    name="allergen"
                    value={allergenData.allergen}
                    onChange={handleAllergenChange}
                    placeholder="Enter allergen name"
                    className="w-full bg-gray-700 text-white border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
                    Description & Information
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={allergenData.description}
                    onChange={handleAllergenChange}
                    placeholder="Provide details about this allergen, common foods it appears in, etc."
                    className="w-full bg-gray-700 text-white border-gray-600 min-h-[120px]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image-allergen" className="block text-sm font-medium text-white mb-1">
                    Upload Image (optional)
                  </label>
                  <Input
                    id="image-allergen"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full bg-gray-700 text-white border-gray-600"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full max-h-40 object-contain rounded-md"
                      />
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white py-2"
                >
                  Submit Allergen
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>

        {submitted && (
          <div className="mt-4 p-3 bg-green-900/50 text-green-300 rounded-md text-center">
            Thank you for your contribution! Our team will review it shortly.
          </div>
        )}
      </Card>

      {/* Back Navigation */}
      <div className="mt-8">
        <Link to="/">
          <Button variant="outline" className="text-white border-white hover:bg-gray-800">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Contributors;
