import { useEffect } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import UserGuide from "@/components/UserGuide"; 


const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <Features />
      <ProductShowcase />
      
      <section id="design" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase bg-secondary rounded-full animate-fade-in">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mb-4 animate-fade-in-up">
              AI-Powered Food Safety at Your Fingertips
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground animate-fade-in-up animate-delay-100">
              We combine AI innovation with human safety to ensure every meal is allergen-free and worry-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1 animate-fade-in-up">
              <h3 className="text-2xl font-medium mb-4">Safe Eating, Made Simple</h3>
              <p className="text-muted-foreground mb-6">
                Our AI-driven approach makes allergen detection effortless. Simply scan your food, and let our technology identify potential risks, ensuring a safer eating experience.
              </p>
              <p className="text-muted-foreground mb-6">
                With real-time scanning, personalized allergen alerts, and a seamless user experience, we ensure that food safety is accessible to everyone, anywhere.
              </p>
              <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors duration-300">
                See How It Works
              </button>
            </div>
            
            <div className="relative order-1 md:order-2 aspect-square overflow-hidden rounded-2xl animate-fade-in-up animate-delay-200">
              <img 
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2940&auto=format&fit=crop" 
                alt="Product design"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 glass-panel-dark opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-secondary/50">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase bg-white rounded-full animate-fade-in">
            Join Us
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mb-6 animate-fade-in-up">
            Eat with Confidence, Live Without Worry
          </h2>
          <p className="text-muted-foreground mb-10 animate-fade-in-up animate-delay-100">
            Scan your food in seconds and let AI ensure your meals are allergen-free. Experience the future of food safety, powered by cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animate-delay-200">
            <button className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors duration-300">
              Try the App
            </button>
            <button className="px-8 py-3 border border-border font-medium rounded-md hover:bg-white/50 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
