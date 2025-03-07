
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, History, User, Settings, QrCode, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { user } = useAuth();

  // Navigation items
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: History, label: "History", path: "/history" },
    { icon: QrCode, label: "Scan", path: "/scan", primary: true },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top navigation bar (minimal) */}
      <header className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">AllergyGuard</span>
        </div>
        <Link to="/notifications" className="relative p-2">
          <Bell size={20} />
          {/* Notification indicator */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Link>
      </header>
      
      {/* Main content */}
      <main className="flex-1 pb-20">{children}</main>
      
      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex items-center justify-around p-2 z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          // Special styling for the primary "Scan" button
          if (item.primary) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center -mt-6 bg-primary text-primary-foreground rounded-full p-3 shadow-lg transform transition-transform active:scale-95"
              >
                <Icon size={24} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          }
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-md ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
