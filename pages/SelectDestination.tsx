import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BUILDINGS, ROOMS } from '../constants';
import { Building } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Navigation as NavIcon, ChevronRight } from 'lucide-react';

const SelectDestination: React.FC = () => {
  const { detectedLocation, setSelectedDestination } = useApp();
  const navigate = useNavigate();

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    detectedLocation ? BUILDINGS.find(b => b.name === detectedLocation.building) || null : null
  );
  
  const [selectedFloor, setSelectedFloor] = useState<string>(detectedLocation?.floor || '');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');

  const availableRooms = useMemo(() => {
    return ROOMS.filter(room => {
      const matchBuilding = selectedBuilding ? room.building === selectedBuilding.name : true;
      const matchFloor = selectedFloor ? room.floor === selectedFloor : true;
      return matchBuilding && matchFloor;
    });
  }, [selectedBuilding, selectedFloor]);

  const handleStartNavigation = () => {
    const room = ROOMS.find(r => r.id === selectedRoomId);
    if (room) {
      setSelectedDestination(room);
      navigate('/navigate');
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="px-1">
         <h2 className="text-[28px] font-bold text-black dark:text-white">Destination</h2>
      </div>

      {detectedLocation && (
        <div className="px-4 py-2 bg-[#34C759]/10 rounded-xl flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-[#34C759]"></div>
          <span className="text-[15px] text-[#34C759] font-medium">
             Near {detectedLocation.building}, Floor {detectedLocation.floor}
          </span>
        </div>
      )}

      {/* iOS Form Group */}
      <Card>
        <div className="divide-y divide-[#C6C6C8] dark:divide-[#38383A] pl-4">
          
          {/* Building Select */}
          <div className="relative py-3 pr-4 flex items-center justify-between min-h-[50px]">
            <label className="text-[17px] text-black dark:text-white w-24 flex-shrink-0">Building</label>
            <select 
              className="flex-1 text-[17px] text-[#007AFF] text-right bg-transparent outline-none pr-6 dir-rtl"
              value={selectedBuilding?.id || ''}
              onChange={(e) => {
                const b = BUILDINGS.find(b => b.id === e.target.value) || null;
                setSelectedBuilding(b);
                setSelectedFloor('');
                setSelectedRoomId('');
              }}
            >
              <option value="" disabled>Select</option>
              {BUILDINGS.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            <ChevronRight className="w-4 h-4 text-[#C7C7CC] absolute right-4 pointer-events-none" />
          </div>

          {/* Floor Select */}
          <div className={`relative py-3 pr-4 flex items-center justify-between min-h-[50px] ${!selectedBuilding ? 'opacity-50' : ''}`}>
            <label className="text-[17px] text-black dark:text-white w-24 flex-shrink-0">Floor</label>
            <select 
              className="flex-1 text-[17px] text-[#007AFF] text-right bg-transparent outline-none pr-6"
              value={selectedFloor}
              onChange={(e) => { setSelectedFloor(e.target.value); setSelectedRoomId(''); }}
              disabled={!selectedBuilding}
            >
              <option value="" disabled>Select</option>
              {selectedBuilding?.floors.map(floor => (
                <option key={floor} value={floor}>{floor === 'G' ? 'Ground' : `Level ${floor}`}</option>
              ))}
            </select>
             <ChevronRight className="w-4 h-4 text-[#C7C7CC] absolute right-4 pointer-events-none" />
          </div>

          {/* Room Select */}
          <div className={`relative py-3 pr-4 flex items-center justify-between min-h-[50px] ${!selectedFloor ? 'opacity-50' : ''}`}>
            <label className="text-[17px] text-black dark:text-white w-24 flex-shrink-0">Room</label>
            <select 
              className="flex-1 text-[17px] text-[#007AFF] text-right bg-transparent outline-none pr-6"
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              disabled={!selectedBuilding}
            >
              <option value="" disabled>Select</option>
              {availableRooms.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
             <ChevronRight className="w-4 h-4 text-[#C7C7CC] absolute right-4 pointer-events-none" />
          </div>

        </div>
      </Card>

      <div className="pt-4">
        <Button 
          onClick={handleStartNavigation} 
          disabled={!selectedRoomId}
        >
          <NavIcon className="w-5 h-5 mr-2" />
          Start Navigation
        </Button>
      </div>
    </div>
  );
};

export default SelectDestination;