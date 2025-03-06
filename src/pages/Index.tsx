
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanBarcode, Search, Shield, Upload, BarChart4 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';

const Index = () => {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <section className="text-center space-y-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="block">Scan, Discover,</span>
              <span className="block text-primary">Stay Safe</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-prose mx-auto">
              Instantly identify allergens in food products with a simple barcode scan. 
              Take control of your food safety and make informed choices.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/scan">
              <Button size="lg" className="gap-2">
                <ScanBarcode className="h-5 w-5" />
                Scan Now
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="outline" className="gap-2">
                <Search className="h-5 w-5" />
                Search Products
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-8">Why Use AllergenScan?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard 
                key={feature.title} 
                feature={feature} 
                index={i} 
              />
            ))}
          </div>
        </section>
        
        {/* Quick Status */}
        <section className="py-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Allergen Status</CardTitle>
              <CardDescription>
                You have 5 allergens in your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['Peanuts', 'Tree nuts', 'Dairy', 'Eggs', 'Gluten'].map((allergen) => (
                  <div key={allergen} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm flex items-center">
                    <Shield className="h-3.5 w-3.5 mr-1.5" />
                    {allergen}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Your Allergens
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </motion.div>
    </MainLayout>
  );
};

const features = [
  {
    title: 'Instant Allergen Detection',
    description: 'Scan any barcode and instantly see if a product contains your allergens.',
    icon: ScanBarcode,
  },
  {
    title: 'Personalized Alerts',
    description: 'Set your allergen profile and receive customized warnings for products.',
    icon: Shield,
  },
  {
    title: 'Contribute & Share',
    description: 'Help the community by adding missing products to our growing database.',
    icon: Upload,
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
    >
      <Card className="h-full">
        <CardHeader>
          <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Index;
