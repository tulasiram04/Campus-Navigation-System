import React, { ReactNode } from 'react';
import { useApp } from '../context/AppContext';
import { Moon, Sun, ChevronLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/home': return 'Campus';
      case '/scan': return 'Scan';
      case '/select': return 'Destination';
      case '/navigate': return 'Navigation';
      case '/admin': return 'Admin';
      default: return 'Smart Campus';
    }
  };

  const isLoginPage = location.pathname === '/';
  const isHome = location.pathname === '/home';
  const isFullScreen = location.pathname === '/scan';

  if (isFullScreen) return <>{children}</>;

  return (
    <div className="min-h-screen text-black dark:text-white font-sans antialiased pb-safe">
      
      {/* iOS Navigation Bar - Hidden on Login */}
      {!isLoginPage && (
        <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-[#F2F2F7]/80 dark:bg-[#000000]/80 backdrop-blur-xl border-b border-[#C6C6C8] dark:border-[#38383A] transition-all">
          <div className="h-[44px] flex items-center justify-between px-4 max-w-2xl mx-auto">
            {/* Left Button (Back) */}
            <div className="flex-1 flex justify-start">
              {!isHome && (
                <button 
                  onClick={() => navigate(-1)} 
                  className="flex items-center text-[#007AFF] text-[17px] active:opacity-50 transition-opacity"
                >
                  <ChevronLeft className="w-6 h-6 -ml-2" />
                  <span>Back</span>
                </button>
              )}
            </div>

            {/* Title */}
            <div className="flex-1 flex justify-center">
              <span className="font-semibold text-[17px]">{!isHome ? getPageTitle() : 'Smart Campus'}</span>
            </div>

            {/* Right Button (Theme/Action) */}
            <div className="flex-1 flex justify-end">
              <button
                onClick={toggleTheme}
                className="text-[#007AFF] p-1 active:opacity-50"
              >
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`${!isLoginPage ? 'pt-[calc(44px+env(safe-area-inset-top))]' : 'pt-safe'} px-4 max-w-2xl mx-auto min-h-screen`}>
        <div className="py-6">
           {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;