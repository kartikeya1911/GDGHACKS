
import { useState } from "react";
import { useAuth, Allergen, AllergySeverity } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AllergenTag } from "@/components/ui/allergen-tag";
import { COMMON_ALLERGENS } from "@/contexts/AllergyDataContext";
import { 
  AlertCircle,
  Search,
  User,
  Mail,
  Phone,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  const { user, userAllergies, updateUser, addAllergen, removeAllergen } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isEditing, setIsEditing] = useState(false);
  
  // Allergen input state
  const [allergenSearch, setAllergenSearch] = useState("");
  const [selectedAllergen, setSelectedAllergen] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<AllergySeverity>("mild");
  
  // Filtered allergens based on search
  const filteredAllergens = COMMON_ALLERGENS.filter(allergen => 
    allergen.name.toLowerCase().includes(allergenSearch.toLowerCase())
  );

  const handleSaveProfile = () => {
    updateUser({
      name,
      email,
      phone,
    });
    setIsEditing(false);
  };

  const handleAddAllergen = () => {
    if (selectedAllergen) {
      addAllergen({
        name: selectedAllergen,
        severity: selectedSeverity,
      });
      setSelectedAllergen("");
      setSelectedSeverity("mild");
      setAllergenSearch("");
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <section className="bg-card p-6 rounded-lg border shadow-sm">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-medium">{user?.name || "User"}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            {user?.phone && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} />
                {user.phone}
              </p>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(true)}
              className="mt-4"
            >
              Edit Profile
            </Button>
          </div>
        )}
      </section>
      
      <section className="bg-card p-6 rounded-lg border shadow-sm">
        <h2 className="text-xl font-bold mb-4">My Allergies</h2>
        
        <div className="space-y-6">
          {/* Add new allergen form */}
          <div className="space-y-4 p-4 border rounded-md bg-secondary/30">
            <Label htmlFor="allergen">Add New Allergen</Label>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="allergenSearch"
                placeholder="Search allergens..."
                value={allergenSearch}
                onChange={(e) => setAllergenSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {allergenSearch && (
              <div className="max-h-40 overflow-y-auto border rounded-md bg-background">
                {filteredAllergens.length > 0 ? (
                  filteredAllergens.map((allergen) => (
                    <button
                      key={allergen.id}
                      className="w-full text-left px-3 py-2 hover:bg-secondary/50 focus:bg-secondary/50 focus:outline-none"
                      onClick={() => {
                        setSelectedAllergen(allergen.name);
                        setAllergenSearch("");
                      }}
                    >
                      {allergen.name}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-muted-foreground text-sm">
                    No allergens found
                  </div>
                )}
              </div>
            )}
            
            {selectedAllergen && (
              <div className="space-y-4">
                <div className="p-2 border rounded-md bg-background">
                  <p className="font-medium">{selectedAllergen}</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity Level</Label>
                  <Select 
                    value={selectedSeverity} 
                    onValueChange={(value: AllergySeverity) => setSelectedSeverity(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleAddAllergen}>
                  Add Allergen
                </Button>
              </div>
            )}
          </div>
          
          {/* Current allergies list */}
          <div>
            <h3 className="text-base font-medium mb-3">My Allergen List</h3>
            
            {userAllergies.length > 0 ? (
              <div className="space-y-2">
                {userAllergies.map((allergen: Allergen) => (
                  <div key={allergen.id} className="flex items-center justify-between p-3 border rounded-md">
                    <AllergenTag
                      name={allergen.name}
                      severity={allergen.severity}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAllergen(allergen.id)}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Remove</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-md">
                <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">You haven't added any allergies yet</p>
                <p className="text-sm text-muted-foreground">
                  Adding your allergies will help us analyze product ingredients
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
