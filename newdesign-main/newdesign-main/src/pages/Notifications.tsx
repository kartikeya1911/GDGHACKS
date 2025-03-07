import { useState } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define notification type
interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "info" | "warning" | "danger";
}

// Mock notification data
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New allergen detected",
    message: "A new trace allergen 'Celery' has been detected in products you've scanned.",
    date: "2023-06-15T10:30:00Z",
    read: false,
    type: "warning"
  },
  {
    id: "2",
    title: "Product recall alert",
    message: "Important: 'Chocolate Chip Cookies' has been recalled by the manufacturer due to undeclared peanuts.",
    date: "2023-06-10T14:22:00Z",
    read: false,
    type: "danger"
  },
  {
    id: "3",
    title: "Profile updated",
    message: "Your allergy profile has been successfully updated.",
    date: "2023-06-05T09:15:00Z",
    read: true,
    type: "info"
  },
  {
    id: "4",
    title: "Welcome to AllergyGuard",
    message: "Thank you for joining! Start by adding your allergies in your profile.",
    date: "2023-06-01T11:45:00Z",
    read: true,
    type: "info"
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  
  // Format date to relative time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }
    
    return date.toLocaleDateString();
  };

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Get color for notification type
  const getTypeColor = (type: "info" | "warning" | "danger") => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "danger":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
              {unreadCount}
            </span>
          )}
        </div>
        
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-4 border rounded-lg relative ${
                notification.read ? "bg-card" : "bg-card border-primary/50 shadow-sm"
              }`}
            >
              <div className="flex gap-3">
                <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                  <Bell size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium ${notification.read ? "" : "font-semibold"}`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(notification.date)}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check size={14} />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <Bell className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-1">No notifications</p>
            <p className="text-sm text-muted-foreground">
              You'll receive alerts about products and allergens here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
