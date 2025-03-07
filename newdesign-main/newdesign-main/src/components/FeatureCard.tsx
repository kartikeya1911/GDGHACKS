
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const FeatureCard = ({ title, description, icon, index }: FeatureCardProps) => {
  const delays = ["0", "100", "200", "300"];
  const delay = delays[index % delays.length];
  
  return (
    <div 
      className={cn(
        "group relative p-6 md:p-8 bg-card rounded-xl border border-border transition-all duration-300",
        "hover:shadow-md hover:border-border/80 hover:-translate-y-1",
        `animate-fade-in-up animate-delay-${delay}`
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-2 bg-secondary rounded-lg text-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary rounded-bl-xl rounded-br-xl transition-all duration-300 group-hover:w-full"></div>
    </div>
  );
};

export default FeatureCard;
