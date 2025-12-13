import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, X, ChevronLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { identifyLocation } from '../services/geminiService';
import { useApp } from '../context/AppContext';

const Scan: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setDetectedLocation } = useApp();

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Camera Error", err);
        setHasPermission(false);
        setError("Camera access denied. Please check your settings.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsScanning(true);
    setError(null);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas context");

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg', 0.8);

      const result = await identifyLocation(base64Image);
      
      setDetectedLocation(result);
      navigate('/select');

    } catch (err) {
      console.error(err);
      setError("Analysis failed. Try getting closer to a room number or sign.");
    } finally {
      setIsScanning(false);
    }
  };

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 text-center">
        <AlertCircle size={48} className="text-yellow-500 mb-4" />
        <h2 className="text-[20px] font-bold mb-2">Camera Access Required</h2>
        <p className="text-[15px] text-gray-400 mb-6">Allow access in Settings to scan your location.</p>
        <Button onClick={() => navigate('/home')} variant="secondary">Cancel</Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col pt-safe pb-safe">
      
      {/* Top Bar (iOS Camera Style) */}
      <div className="h-[44px] flex items-center justify-between px-4 z-20">
         <button onClick={() => navigate(-1)} className="text-white">
            <ChevronLeft className="w-8 h-8" />
         </button>
         <span className="text-yellow-400 font-medium text-[13px] bg-yellow-400/20 px-2 py-0.5 rounded text-center">
           AI VISION
         </span>
         <div className="w-8"></div>
      </div>

      {/* Main Camera Viewport */}
      <div className="flex-1 relative bg-black overflow-hidden my-4 rounded-[32px]">
        <canvas ref={canvasRef} className="hidden" />
        
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className={`w-full h-full object-cover transition-opacity duration-300 ${isScanning ? 'opacity-50' : 'opacity-100'}`}
        />

        {/* Viewfinder Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
           <div className="w-[280px] h-[280px] border border-yellow-400/50 rounded-[32px] relative">
              {/* Corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-400 rounded-tl-[12px]"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-400 rounded-tr-[12px]"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-400 rounded-bl-[12px]"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-400 rounded-br-[12px]"></div>
              
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-semibold animate-pulse">Scanning...</span>
                </div>
              )}
           </div>
        </div>

        {error && (
          <div className="absolute top-4 left-0 right-0 flex justify-center px-4">
             <div className="bg-red-500/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium">
               {error}
             </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="h-[120px] flex items-center justify-center z-20">
        <button 
          onClick={captureAndAnalyze}
          disabled={isScanning}
          className="w-[72px] h-[72px] rounded-full bg-white border-[4px] border-white/30 flex items-center justify-center active:scale-90 transition-transform"
        >
           <div className="w-[60px] h-[60px] rounded-full bg-white border-[2px] border-black"></div>
        </button>
      </div>
    </div>
  );
};

export default Scan;