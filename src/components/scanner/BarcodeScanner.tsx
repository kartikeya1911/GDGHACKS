
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, RefreshCcw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// We'll simulate a barcode scanner functionality
const BarcodeScanner = ({ onScan }: { onScan: (code: string) => void }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerLineRef = useRef<HTMLDivElement>(null);

  // Simulated function to request camera permission
  const requestCameraPermission = async () => {
    try {
      // This would normally use the device camera
      // For simulation, we'll just set permission to true after a delay
      setTimeout(() => {
        setCameraPermission(true);
        setIsScanning(true);
        
        // Simulate finding a barcode after 3 seconds
        setTimeout(() => {
          const mockBarcodes = ['5449000000996', '8076800195057', '3017620422003'];
          const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
          handleBarcodeDetected(randomBarcode);
        }, 3000);
      }, 1000);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraPermission(false);
      toast.error('Could not access camera. Please check permissions.');
    }
  };

  const handleBarcodeDetected = (barcode: string) => {
    // Play a success sound or vibration here in a real app
    setIsScanning(false);
    
    // Animate success and then call the callback
    if (scannerLineRef.current) {
      scannerLineRef.current.style.backgroundColor = '#10b981';
    }
    
    setTimeout(() => {
      toast.success(`Barcode detected: ${barcode}`);
      onScan(barcode);
    }, 500);
  };

  const resetScanner = () => {
    setIsScanning(false);
    if (scannerLineRef.current) {
      scannerLineRef.current.style.backgroundColor = '#3b82f6';
    }
    setTimeout(() => {
      setIsScanning(true);
    }, 100);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <motion.div 
        className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden glass-card mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!isScanning ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <Button
              variant="default"
              size="lg"
              className="flex items-center gap-2"
              onClick={requestCameraPermission}
            >
              <Camera className="w-5 h-5" />
              Start Scanning
            </Button>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5">
            {/* This would be the camera feed in a real implementation */}
            <div className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p className="text-sm font-medium mb-2">Point camera at barcode</p>
                <motion.div 
                  className="w-4/5 h-0.5 bg-blue-500"
                  ref={scannerLineRef}
                  animate={{
                    y: ['-100px', '100px', '-100px'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
              
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/80"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/80"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/80"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/80"></div>
            </div>
          </div>
        )}
      </motion.div>
      
      <div className="flex gap-2">
        {isScanning && (
          <Button variant="outline" onClick={resetScanner} className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" />
            Reset
          </Button>
        )}
        <Button variant="outline" onClick={() => {
          toast.info("Manually enter a barcode to search for products");
        }} className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Enter Manually
        </Button>
      </div>
    </div>
  );
};

export default BarcodeScanner;
