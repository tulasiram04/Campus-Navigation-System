import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Lock, Upload, Save, Trash2, Edit } from 'lucide-react';
import { ROOMS } from '../constants';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Invalid password');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold">Admin Portal</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter password (admin123)"
              className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Access Dashboard</Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Campus Data Management</h1>
        <Button variant="outline" className="w-auto px-4 py-2 text-sm" onClick={() => setIsAuthenticated(false)}>Logout</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Floor Maps</h3>
            <Button variant="secondary" className="w-auto p-2"><Upload className="w-4 h-4" /></Button>
          </div>
          <div className="space-y-2">
            {['Science Block - Floor 1', 'Science Block - Floor 2', 'Engineering - G'].map((map, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <span className="text-sm">{map}.svg</span>
                <span className="text-xs text-green-500 font-bold">Active</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Room Database</h3>
            <Button variant="secondary" className="w-auto p-2"><Save className="w-4 h-4" /></Button>
          </div>
           <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {ROOMS.map(room => (
              <div key={room.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg group">
                <div>
                  <div className="font-medium text-sm">{room.name}</div>
                  <div className="text-xs text-gray-500">{room.building} - Flr {room.floor}</div>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-blue-500"><Edit className="w-4 h-4" /></button>
                  <button className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;