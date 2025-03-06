
import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface AllergenSettingsProps {
  userAllergens: string[];
  onUpdate: (allergens: string[]) => void;
}

// Common allergens list
const commonAllergens = [
  'Milk', 'Eggs', 'Fish', 'Shellfish', 'Tree nuts', 'Peanuts', 
  'Wheat', 'Soybeans', 'Sesame', 'Gluten', 'Mustard', 'Celery',
  'Lupin', 'Molluscs', 'Sulphites'
];

const AllergenSettings = ({ userAllergens, onUpdate }: AllergenSettingsProps) => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(userAllergens);
  const [customAllergen, setCustomAllergen] = useState('');
  
  const handleToggleAllergen = (allergen: string) => {
    setSelectedAllergens(prev => {
      if (prev.includes(allergen.toLowerCase())) {
        return prev.filter(a => a !== allergen.toLowerCase());
      } else {
        return [...prev, allergen.toLowerCase()];
      }
    });
  };
  
  const handleAddCustomAllergen = () => {
    if (!customAllergen.trim()) return;
    
    const formattedAllergen = customAllergen.trim().toLowerCase();
    if (selectedAllergens.includes(formattedAllergen)) {
      toast.error(`${customAllergen} is already in your allergen list`);
      return;
    }
    
    setSelectedAllergens(prev => [...prev, formattedAllergen]);
    setCustomAllergen('');
    toast.success(`Added ${customAllergen} to your allergens`);
  };
  
  const handleSave = () => {
    onUpdate(selectedAllergens);
    toast.success('Allergen preferences saved successfully');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 w-full max-w-md mx-auto"
    >
      <div>
        <h3 className="text-lg font-medium mb-3">Common Allergens</h3>
        <div className="flex flex-wrap gap-2">
          {commonAllergens.map((allergen) => (
            <Badge
              key={allergen}
              variant={selectedAllergens.includes(allergen.toLowerCase()) ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedAllergens.includes(allergen.toLowerCase()) 
                  ? 'bg-primary hover:bg-primary/90' 
                  : 'hover:bg-secondary'
              } px-3 py-1.5`}
              onClick={() => handleToggleAllergen(allergen)}
            >
              {selectedAllergens.includes(allergen.toLowerCase()) && (
                <Check className="mr-1 h-3 w-3" />
              )}
              {allergen}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Custom Allergens</h3>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter a custom allergen"
            value={customAllergen}
            onChange={(e) => setCustomAllergen(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleAddCustomAllergen()}
          />
          <Button type="button" onClick={handleAddCustomAllergen}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {selectedAllergens.filter(a => !commonAllergens.map(ca => ca.toLowerCase()).includes(a)).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedAllergens
              .filter(a => !commonAllergens.map(ca => ca.toLowerCase()).includes(a))
              .map((allergen) => (
                <Badge
                  key={allergen}
                  variant="default"
                  className="bg-primary hover:bg-primary/90 px-3 py-1.5 capitalize cursor-pointer"
                  onClick={() => handleToggleAllergen(allergen)}
                >
                  <Check className="mr-1 h-3 w-3" />
                  {allergen}
                </Badge>
              ))}
          </div>
        )}
      </div>
      
      <Button className="w-full" onClick={handleSave}>
        Save Preferences
      </Button>
    </motion.div>
  );
};

export default AllergenSettings;
