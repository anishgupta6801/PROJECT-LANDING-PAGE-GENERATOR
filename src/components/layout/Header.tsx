import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Moon, Sun, Menu, Laptop } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/75 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/75">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Laptop className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold tracking-tight">LandingAI</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/create" 
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              Create
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onToggleDarkMode}
              className="h-9 w-9"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button 
              variant="primary"
              size="sm"
              asChild
              className="hidden md:inline-flex"
            >
              <Link to="/create">
                Create Landing Page
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden h-9 w-9"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;