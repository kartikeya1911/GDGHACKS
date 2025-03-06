
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Settings as SettingsIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AllergenSettings from '@/components/user/AllergenSettings';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Mock user allergens
const initialUserAllergens = ['peanuts', 'tree nuts', 'gluten'];

const ProfilePage = () => {
  const [userAllergens, setUserAllergens] = useState<string[]>(initialUserAllergens);
  
  const handleUpdateAllergens = (allergens: string[]) => {
    setUserAllergens(allergens);
  };
  
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">JD</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-muted-foreground">john.doe@example.com</p>
        </div>
        
        <Tabs defaultValue="allergens" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="allergens" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Allergens</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="allergens" className="focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <AllergenSettings 
                    userAllergens={userAllergens} 
                    onUpdate={handleUpdateAllergens} 
                  />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="history" className="focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-medium mb-4">Scan History</h2>
                  <p className="text-muted-foreground mb-4">Your recent product scans will appear here.</p>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                            <Shield className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Product {item}</p>
                            <p className="text-xs text-muted-foreground">Scanned yesterday</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="settings" className="focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h2 className="text-xl font-medium mb-4">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-medium mb-2">Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p>Email Alerts</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast.success('Notification settings updated')}
                          >
                            Enabled
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>Push Notifications</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast.success('Notification settings updated')}
                          >
                            Enabled
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium mb-2">Privacy</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p>Profile Visibility</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast.success('Privacy settings updated')}
                          >
                            Private
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>Share Scan History</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast.success('Privacy settings updated')}
                          >
                            Off
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={() => toast.error('This would delete your account (not actually implemented)')}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
