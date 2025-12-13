import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_PATH_COORDINATES } from '../constants';
import Button from '../components/ui/Button';
import { 
  ArrowLeft, X, 
  Footprints,
  Clock, Share, Navigation as NavIcon,
  Plus, Minus, RotateCw, MapPin, Search
} from 'lucide-react';

const Navigation: React.FC = () => {
  const { selectedDestination, detectedLocation } = useApp();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Map View State
  const mapRef = useRef<HTMLDivElement>(null);
  const [viewState, setViewState] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!selectedDestination) {
      navigate('/select');
    }
  }, [selectedDestination, navigate]);

  if (!selectedDestination) return null;

  // Map Logic
  const handleWheel = (e: React.WheelEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.min(Math.max(viewState.scale * zoomFactor, 0.5), 5);
    const scaleRatio = newScale / viewState.scale;
    const newX = mouseX - (mouseX - viewState.x) * scaleRatio;
    const newY = mouseY - (mouseY - viewState.y) * scaleRatio;
    setViewState({ x: newX, y: newY, scale: newScale });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setViewState(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="fixed inset-0 bg-[#F2F2F7] z-50 flex flex-col">
      
      {/* 1. Full Screen Map Layer */}
      <div 
        ref={mapRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none bg-[#E5E5EA] dark:bg-black"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
           className="w-full h-full origin-top-left"
           style={{
              transform: `translate(${viewState.x}px, ${viewState.y}px) scale(${viewState.scale})`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
           }}
        >
          <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            {/* Map Background */}
            <rect width="800" height="600" fill="#F4F4F4" />
            
            {/* Simple Map Geometry */}
            <path d="M500 50 H800 V200 H500 Z" fill="#D1D1D6" /> {/* Grass/Area */}
            <path d="M250 0 V600" stroke="white" strokeWidth="40" /> {/* Road */}
            <path d="M0 300 H800" stroke="white" strokeWidth="30" /> {/* Road */}
            
            {/* Buildings */}
            <rect x="50" y="50" width="100" height="150" fill="#E0E0E0" stroke="#BDBDBD" />
            <rect x="560" y="200" width="150" height="150" fill="#E0E0E0" stroke="#BDBDBD" />

            {/* Route */}
            <polyline 
              points="420,550 420,450 480,450 500,250 700,250 750,450 720,520" 
              fill="none" 
              stroke="#007AFF" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* Markers */}
            <g transform="translate(720, 520)">
               <circle cx="0" cy="0" r="14" fill="#007AFF" stroke="white" strokeWidth="2" />
               <text x="0" y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">A</text>
            </g>

            <g transform="translate(420, 550)">
               <circle cx="0" cy="0" r="14" fill="#FF3B30" stroke="white" strokeWidth="2" />
               <text x="0" y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">B</text>
            </g>

          </svg>
        </div>
      </div>

      {/* 2. Floating Map Controls (iOS Style) */}
      <div className="absolute top-safe right-4 mt-4 flex flex-col space-y-3 pointer-events-auto z-10">
        <button 
          onClick={() => navigate('/home')} 
          className="w-10 h-10 bg-white/80 dark:bg-[#2C2C2E]/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-sm text-black dark:text-white active:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setViewState({ x: 0, y: 0, scale: 1 })}
          className="w-10 h-10 bg-white/80 dark:bg-[#2C2C2E]/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-sm text-[#007AFF] active:opacity-50"
        >
          <RotateCw className="w-5 h-5" />
        </button>
      </div>

      {/* 3. Bottom Sheet (Apple Maps Style) */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-[#1C1C1E] rounded-t-[20px] shadow-[0_-5px_20px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out flex flex-col ${isExpanded ? 'h-[80vh]' : 'h-[35vh]'}`}
      >
        {/* Drag Handle */}
        <div 
          className="w-full flex justify-center pt-3 pb-2 cursor-pointer active:opacity-50"
          onClick={() => setIsExpanded(!isExpanded)}
        >
           <div className="w-12 h-1.5 bg-[#D1D1D6] rounded-full"></div>
        </div>

        {/* Content */}
        <div className="px-5 pt-2 flex-1 overflow-y-auto">
           <div className="flex justify-between items-start mb-6">
              <div>
                 <h2 className="text-[22px] font-bold text-black dark:text-white leading-tight">
                   {selectedDestination.name}
                 </h2>
                 <p className="text-[#8E8E93] text-[15px]">
                   4 min walk • 328 m
                 </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#007AFF] flex items-center justify-center text-white">
                 <Footprints className="w-6 h-6" />
              </div>
           </div>

           <Button onClick={() => setIsExpanded(true)}>GO</Button>

           {/* Directions List (Visible when expanded or scrolled) */}
           <div className="mt-8 space-y-6">
              <h3 className="font-semibold text-[17px] text-black dark:text-white">Directions</h3>
              
              <div className="flex space-x-4">
                 <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-xs font-bold">1</div>
                    <div className="w-0.5 h-10 bg-[#C6C6C8] my-1"></div>
                 </div>
                 <div className="pt-1">
                    <p className="font-medium text-[17px] text-black dark:text-white">Exit Science Block</p>
                    <p className="text-[#8E8E93] text-[15px]">Walk 50m towards the fountain</p>
                 </div>
              </div>

              <div className="flex space-x-4">
                 <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-xs font-bold">2</div>
                    <div className="w-0.5 h-10 bg-[#C6C6C8] my-1"></div>
                 </div>
                 <div className="pt-1">
                    <p className="font-medium text-[17px] text-black dark:text-white">Turn Left</p>
                    <p className="text-[#8E8E93] text-[15px]">Walk 100m past the Library</p>
                 </div>
              </div>

              <div className="flex space-x-4">
                 <div className="flex flex-col items-center">
                    <MapPin className="w-8 h-8 text-[#FF3B30] fill-[#FF3B30]/20" />
                 </div>
                 <div className="pt-1">
                    <p className="font-medium text-[17px] text-black dark:text-white">Arrive at Destination</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Navigation;