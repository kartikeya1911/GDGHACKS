
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanBarcode, User, Home, Bell, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo purposes
  
  // Toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };
  
  // Check for system preference on initial load
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Scan', href: '/scan', icon: ScanBarcode },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    // In a real app, this would call a logout API
    toast.success('You have been logged out');
    setIsAuthenticated(false);
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex justify-between w-full">
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="rounded-full bg-primary p-1"
              >
                <ScanBarcode className="h-6 w-6 text-white" />
              </motion.div>
              <span className="font-bold text-xl hidden sm:inline-block">AllergenScan</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme} 
                className="text-muted-foreground hover:text-foreground"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              
              {isAuthenticated ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => toast.info('No new notifications')}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Bell className="h-5 w-5" />
                  </Button>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Avatar className="cursor-pointer h-9 w-9 border">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                      </Avatar>
                    </SheetTrigger>
                    <SheetContent>
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-3 pb-6 pt-2">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-base font-medium">John Doe</p>
                            <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          {navigation.map((item) => (
                            <Link key={item.name} to={item.href}>
                              <Button 
                                variant={isActive(item.href) ? "default" : "ghost"} 
                                className="w-full justify-start"
                              >
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.name}
                              </Button>
                            </Link>
                          ))}
                        </div>
                        
                        <div className="mt-auto">
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-destructive"
                            onClick={handleLogout}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log Out
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="default" size="sm">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="sticky bottom-0 border-t backdrop-blur supports-[backdrop-filter]:bg-background/80 z-40">
          <nav className="flex justify-around py-2">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="flex flex-col items-center py-1">
                <div className={`p-1 rounded-full ${isActive(item.href) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className={`text-xs mt-1 ${isActive(item.href) ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
