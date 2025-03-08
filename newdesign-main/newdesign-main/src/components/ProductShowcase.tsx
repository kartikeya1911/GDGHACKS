import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  description: string;
  features: string[];
  image: string;
}

const ProductShowcase = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const products: Product[] = [
    {
      id: 1,
      name: "AI Allergy Scanner",
      description: "An AI-powered scanner that detects allergens in food, providing instant safety insights and recommendations.",
      features: [
        "Real-Time Allergen Detection",
        "AI-Powered Ingredient Analysis",
        "Custom Allergen Profiles",
        "Works Offline & Supports Multiple Languages"
      ],
      image: "https://ambiq.com/wp-content/uploads/2024/10/Sniffing-Out-the-Benefits-of-AI-in-Allergen-Testing-woman-with-tablet.jpg"
    },
    {
      "id": 2,
      "name": "AI Food Scanner",
      "description": "An intelligent allergen detection tool that ensures your meals are safe by analyzing ingredients in real time.",
      "features": [
        "Instant Allergen Recognition",
        "AI-Powered OCR Scanning",
        "Personalized Allergen Alerts",
        "Offline & Multilingual Support"
      ],
      "image": "https://i.nextmedia.com.au/news/GS1_iphonescan.jpg"
    },
    {
      "id": 3,
      "name": "Smart Allergy Tracker",
      "description": "A health companion that tracks your allergen exposure and provides food recommendations for a safer lifestyle.",
      "features": [
        "Custom Allergen Profiles",
        "Safe Food Recommendations",
        "AI-Powered Ingredient Analysis",
        "Seamless App Integration"
      ],
      "image": "https://images.unsplash.com/photo-1594007654729-e1a6a6e50c6e?q=80&w=2940&auto=format&fit=crop"
    }
    
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="products" 
      ref={sectionRef}
      className="py-20 px-6 bg-secondary/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase bg-white rounded-full">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Smart Food Safety, Simplified
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Experience the power of AI in allergen detection—designed for accuracy, ease, and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={cn(
            "relative aspect-square overflow-hidden rounded-2xl transition-all duration-700 transform",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <img 
              src={products[activeProduct].image} 
              alt={products[activeProduct].name}
              className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <span className="absolute bottom-6 left-6 text-white text-sm px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full">
              {products[activeProduct].name}
            </span>
          </div>
          
          <div className={cn(
            "transition-all duration-700 transform",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <h3 className="text-2xl md:text-3xl font-medium mb-4">
              {products[activeProduct].name}
            </h3>
            <p className="text-muted-foreground mb-8">
              {products[activeProduct].description}
            </p>
            
            <div className="space-y-4 mb-8">
              {products[activeProduct].features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-primary mr-3"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 mb-8">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setActiveProduct(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    activeProduct === index 
                      ? "bg-primary w-10" 
                      : "bg-muted hover:bg-muted-foreground/50"
                  )}
                  aria-label={`View ${product.name}`}
                />
              ))}
            </div>
            
            <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors duration-300">
              Try the App
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
