
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Moon,
  Sun,
  Monitor,
  Globe,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    navigate("/login");
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    toast({
      title: "Theme updated",
      description: `Theme changed to ${newTheme === "system" ? "system default" : newTheme}`,
    });
  };

  return (
    <div className="container max-w-md mx-auto p-4 space-y-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Customize your app experience
        </p>
      </div>
      
      {/* Theme settings */}
      <section className="bg-card rounded-lg border shadow-sm p-4 space-y-4">
        <h2 className="text-lg font-medium">Appearance</h2>
        
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleThemeChange("light")}
            className={`p-3 rounded-md border flex flex-col items-center justify-center gap-2 hover:bg-muted/50 ${
              theme === "light" ? "bg-primary/10 border-primary" : ""
            }`}
          >
            <Sun size={20} className={theme === "light" ? "text-primary" : ""} />
            <span className="text-xs">Light</span>
          </button>
          
          <button
            onClick={() => handleThemeChange("dark")}
            className={`p-3 rounded-md border flex flex-col items-center justify-center gap-2 hover:bg-muted/50 ${
              theme === "dark" ? "bg-primary/10 border-primary" : ""
            }`}
          >
            <Moon size={20} className={theme === "dark" ? "text-primary" : ""} />
            <span className="text-xs">Dark</span>
          </button>
          
          <button
            onClick={() => handleThemeChange("system")}
            className={`p-3 rounded-md border flex flex-col items-center justify-center gap-2 hover:bg-muted/50 ${
              theme === "system" ? "bg-primary/10 border-primary" : ""
            }`}
          >
            <Monitor size={20} className={theme === "system" ? "text-primary" : ""} />
            <span className="text-xs">System</span>
          </button>
        </div>
      </section>
      
      {/* Language settings */}
      <section className="bg-card rounded-lg border shadow-sm p-4 space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Globe size={18} />
          Language
        </h2>
        
        <Select defaultValue="en">
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
      </section>
      
      {/* Notification settings */}
      <section className="bg-card rounded-lg border shadow-sm p-4 space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Bell size={18} />
          Notifications
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="product-alerts">Product Alerts</Label>
              <p className="text-xs text-muted-foreground">
                Get notified about product recalls
              </p>
            </div>
            <Switch id="product-alerts" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-allergens">New Allergen Warnings</Label>
              <p className="text-xs text-muted-foreground">
                Updates about newly identified allergens
              </p>
            </div>
            <Switch id="new-allergens" defaultChecked />
          </div>
        </div>
      </section>
      
      {/* Privacy settings */}
      <section className="bg-card rounded-lg border shadow-sm p-4 space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Shield size={18} />
          Privacy & Data
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="save-history">Save Scan History</Label>
              <p className="text-xs text-muted-foreground">
                Store your scanned products
              </p>
            </div>
            <Switch id="save-history" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="offline-mode">Offline Mode</Label>
              <p className="text-xs text-muted-foreground">
                Use the app without internet connection
              </p>
            </div>
            <Switch id="offline-mode" />
          </div>
        </div>
      </section>
      
      {/* Help & support */}
      <section className="bg-card rounded-lg border shadow-sm p-4">
        <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
          <HelpCircle size={18} />
          Help & Support
        </h2>
        
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-left">
            Contact Support
          </Button>
          <Button variant="ghost" className="w-full justify-start text-left">
            Frequently Asked Questions
          </Button>
          <Button variant="ghost" className="w-full justify-start text-left">
            Terms & Conditions
          </Button>
          <Button variant="ghost" className="w-full justify-start text-left">
            Privacy Policy
          </Button>
        </div>
      </section>
      
      {/* Sign out button */}
      <Button 
        variant="destructive" 
        className="w-full flex items-center gap-2"
        onClick={handleSignOut}
      >
        <LogOut size={16} />
        Sign Out
      </Button>
    </div>
  );
};

export default Settings;
