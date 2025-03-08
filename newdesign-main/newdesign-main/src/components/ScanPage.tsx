import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// ...existing code...

const ScanPage: React.FC = () => {
  // ...existing code...
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* ...existing code... */}
      
      {/* Add Contribute Button - Fixed at bottom center */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center">
        <Link to="/contributors">
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-md px-6 py-2 shadow-lg flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            <span>Contribute Missing Item</span>
          </Button>
        </Link>
      </div>
      
      {/* ...existing code... */}
    </div>
  );
};

export default ScanPage;