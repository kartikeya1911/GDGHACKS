
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10",
        isScrolled 
          ? "py-3 backdrop-blur-md bg-white/80 shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight transition-opacity duration-200 hover:opacity-80"
          aria-label="Home"
        >
          Essence
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {["Features", "Products", "Design", "About"].map((item) => (
            <Link
              key={item}
              to={`/#${item.toLowerCase()}`}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <button className="px-4 py-2 text-sm rounded-md border border-border bg-background hover:bg-secondary transition-colors duration-200">
            Sign In
          </button>
          <button className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200">
            Get Started
          </button>
        </div>
        
        <button className="block md:hidden" aria-label="Toggle menu">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-opacity hover:opacity-80"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
