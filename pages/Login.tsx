import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { MapPin } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      navigate('/home');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 animate-slide-in">
      <div className="w-full max-w-sm space-y-8">
        
        {/* Logo / Branding */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-[#007AFF] rounded-[22px] shadow-xl flex items-center justify-center text-white mb-2">
            <MapPin className="w-12 h-12" strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <h1 className="text-[28px] font-bold text-black dark:text-white">Smart Campus</h1>
            <p className="text-[#8E8E93] text-[17px] mt-1">Navigate with ease.</p>
          </div>
        </div>

        {/* Auth Form */}
        <div className="space-y-6">
          <Card className="shadow-sm">
             <div className="divide-y divide-[#C6C6C8] dark:divide-[#38383A] pl-4">
                
                {isSignUp && (
                  <div className="py-1 pr-4">
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      className="w-full py-3.5 text-[17px] bg-transparent outline-none placeholder-[#8E8E93] text-black dark:text-white"
                    />
                  </div>
                )}

                <div className="py-1 pr-4">
                  <input 
                    type="email" 
                    placeholder="Email"
                    className="w-full py-3.5 text-[17px] bg-transparent outline-none placeholder-[#8E8E93] text-black dark:text-white"
                  />
                </div>

                <div className="py-1 pr-4">
                  <input 
                    type="password" 
                    placeholder="Password"
                    className="w-full py-3.5 text-[17px] bg-transparent outline-none placeholder-[#8E8E93] text-black dark:text-white"
                  />
                </div>
             </div>
          </Card>

          <Button onClick={handleAuth} isLoading={isLoading}>
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>

          <div className="flex justify-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#007AFF] text-[15px] font-medium active:opacity-60 transition-opacity"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'New here? Create Account'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[13px] text-[#8E8E93] pt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>

      </div>
    </div>
  );
};

export default Login;