
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface HomeActionButtonProps extends ButtonProps {
  destination: string;
  children: React.ReactNode;
}

const HomeActionButton = ({ 
  destination, 
  children, 
  ...buttonProps 
}: HomeActionButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = () => {
    if (user) {
      // User is authenticated, navigate to destination
      navigate(destination);
    } else {
      // User is not authenticated, redirect to login
      toast({
        title: "Authentication required",
        description: "Please sign in to access this feature",
      });
      navigate("/login", { state: { from: destination } });
    }
  };

  return (
    <Button onClick={handleClick} {...buttonProps}>
      {children}
    </Button>
  );
};

export default HomeActionButton;
