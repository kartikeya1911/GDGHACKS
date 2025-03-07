
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-medium mb-4 animate-fade-in">404</h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up animate-delay-100">
            We couldn't find the page you're looking for.
          </p>
          <Link 
            to="/" 
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors duration-300 animate-fade-in-up animate-delay-200"
          >
            Return Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
