import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const UserGuide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-6 py-12">
      {/* Header Section */}
      <h1 className="text-white text-4xl font-bold mt-6">Experience the Difference</h1>
      <p className="text-gray-400 text-center mt-2 max-w-xl">
        Scan your food in seconds and let AI ensure your meals are allergen-free.
        Experience the future of food safety, powered by cutting-edge technology.
      </p>

      {/* Features Section */}
      <div className="w-full max-w-2xl mt-6 space-y-4">
        <Card className="p-4 bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-white text-lg font-semibold">📸 Scan Food Instantly</h2>
          <p className="text-gray-400">Point your camera at food labels or fresh food to detect allergens in real time.</p>
        </Card>

        <Card className="p-4 bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-white text-lg font-semibold">⚠️ Allergen Alerts</h2>
          <p className="text-gray-400">Receive instant alerts if allergens are detected based on your custom profile.</p>
        </Card>

        <Card className="p-4 bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-white text-lg font-semibold">🔄 Works Offline</h2>
          <p className="text-gray-400">No internet? No problem. Scan food even when you're offline.</p>
        </Card>

        <Card className="p-4 bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-white text-lg font-semibold">🔍 Detailed Reports</h2>
          <p className="text-gray-400">Get detailed reports on the allergens found in your food, including potential cross-contamination risks.</p>
        </Card>

        <Card className="p-4 bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-white text-lg font-semibold">🌐 Global Database</h2>
          <p className="text-gray-400">Access a global database of food allergens, constantly updated by our community and experts.</p>
        </Card>
      </div>

      {/* Call to Action Section */}
      <div className="flex space-x-4 mt-6">
        <Button className="bg-white text-black px-6 py-3 rounded-lg shadow-lg">Try the App</Button>
        <button className="border border-white text-white px-6 py-3 rounded-lg shadow-lg">
          Learn More
        </button>
      </div>
      
      {/* Contribute Button */}
      <div className="mt-8">
        <Link to="/contributors">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg">
            Contribute to Our Database
          </Button>
        </Link>
      </div>
      
      {/* Back Button */}
      <div className="mt-4">
        <Link to="/">
          <Button variant="outline" className="text-white border-white hover:bg-gray-800 shadow-lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserGuide;
