import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, Search, Map, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-slide-in">
      {/* iOS Large Title */}
      <div className="pt-2 px-1">
        <h1 className="text-[34px] font-bold tracking-tight text-black dark:text-white leading-tight">
          Where to?
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Scan Button - iOS Style */}
        <button 
          onClick={() => navigate('/scan')}
          className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 flex flex-col items-center justify-center space-y-3 shadow-sm active:scale-95 transition-transform duration-200 h-40"
        >
          <div className="w-14 h-14 bg-[#007AFF] rounded-full flex items-center justify-center text-white shadow-md">
            <Scan className="w-7 h-7" />
          </div>
          <span className="font-semibold text-[15px]">Scan Location</span>
        </button>

        {/* Search Button - iOS Style */}
        <button 
          onClick={() => navigate('/select')}
          className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 flex flex-col items-center justify-center space-y-3 shadow-sm active:scale-95 transition-transform duration-200 h-40"
        >
          <div className="w-14 h-14 bg-[#5856D6] rounded-full flex items-center justify-center text-white shadow-md">
            <Search className="w-7 h-7" />
          </div>
          <span className="font-semibold text-[15px]">Find Room</span>
        </button>
      </div>

      {/* Recent / Info Section Styled as Grouped List */}
      <div>
        <h2 className="text-[20px] font-bold text-black dark:text-white mb-2 px-1">Info</h2>
        <Card>
          <div className="divide-y divide-[#C6C6C8] dark:divide-[#38383A] pl-4">
            <div className="py-3 pr-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF9500] flex items-center justify-center text-white">
                  <Map className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[17px] font-medium">Campus Map</span>
                  <span className="text-[13px] text-[#8E8E93]">v2.4 Updated today</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#C7C7CC]" />
            </div>
            
             <div className="py-3 pr-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#34C759] flex items-center justify-center text-white">
                  <span className="font-bold text-xs">AI</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[17px] font-medium">Status</span>
                  <span className="text-[13px] text-[#8E8E93]">Online</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <p className="text-center text-[13px] text-[#8E8E93] pt-4">
        Smart Campus Navigator &copy; 2025
      </p>
    </div>
  );
};

export default Home;