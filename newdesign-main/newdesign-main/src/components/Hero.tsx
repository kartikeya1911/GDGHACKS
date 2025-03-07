
import { useEffect, useRef } from "react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      heroRef.current.style.setProperty('--mouse-x', `${x * 4}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y * 4}px`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen pt-20 flex flex-col items-center justify-center px-6 hero-gradient overflow-hidden"
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0"></div>
      
      <div className="max-w-screen-lg mx-auto text-center z-10 animate-fade-in">
        <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase bg-secondary rounded-full animate-fade-in-up">
          Introducing a New Era of Design
        </span>
        
        <h1 className="font-medium tracking-tight text-4xl md:text-6xl lg:text-7xl mb-4 animate-fade-in-up animate-delay-100">
          Simplicity is the Ultimate <br className="hidden md:block" />
          <span className="relative">
            Sophistication
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/10"></span>
          </span>
        </h1>
        
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200">
          Discover the perfect balance between form and function with our thoughtfully crafted products 
          designed to elevate your everyday experience.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up animate-delay-300">
          <button className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors duration-300">
            Explore Products
          </button>
          <button className="w-full sm:w-auto px-8 py-3 border border-border font-medium rounded-md hover:bg-secondary transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-pulse-soft">
        <button 
          aria-label="Scroll down"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="text-foreground/50 hover:text-foreground transition-colors duration-300"
        >
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
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
