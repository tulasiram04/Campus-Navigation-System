import { Building, Room } from './types';

export const BUILDINGS: Building[] = [
  { id: 'sci', name: 'Science Block', floors: ['G', '1', '2', '3'] },
  { id: 'eng', name: 'Engineering Hall', floors: ['G', '1', '2', '3', '4'] },
  { id: 'lib', name: 'Central Library', floors: ['G', '1'] },
];

export const ROOMS: Room[] = [
  // Science Block
  { id: 's101', name: 'S-101 Physics Lab', floor: '1', building: 'Science Block', coordinates: { x: 20, y: 30 } },
  { id: 's102', name: 'S-102 Chemistry Lab', floor: '1', building: 'Science Block', coordinates: { x: 80, y: 30 } },
  { id: 's201', name: 'S-201 Lecture Hall', floor: '2', building: 'Science Block', coordinates: { x: 50, y: 50 } },
  
  // Engineering Hall
  { id: 'e101', name: 'E-101 Computer Lab', floor: '1', building: 'Engineering Hall', coordinates: { x: 30, y: 40 } },
  { id: 'e305', name: 'E-305 Dean Office', floor: '3', building: 'Engineering Hall', coordinates: { x: 60, y: 60 } },
];

export const MOCK_PATH_COORDINATES = [
  { x: 50, y: 90 }, // Entrance
  { x: 50, y: 70 }, // Hallway
  { x: 20, y: 70 }, // Turn left
  { x: 20, y: 30 }, // Destination
];