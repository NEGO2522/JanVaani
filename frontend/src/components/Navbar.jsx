import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path) => {
    return location.pathname === path 
      ? 'text-primary border-b-2 border-primary font-bold pb-1 text-sm transition-colors duration-200'
      : 'text-gray-600 font-medium text-sm hover:text-orange-500 transition-colors duration-200 pb-1 border-b-2 border-transparent';
  };

  const getMobileLinkClass = (path) => {
    return location.pathname === path
      ? 'block px-3 py-2 rounded-md text-sm font-bold text-white bg-primary'
      : 'block px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-white hover:bg-orange-500 transition-colors';
  };

  return (
    <div className="px-4 pt-4 fixed top-0 w-full z-50 flex justify-center">
      <header className="bg-white/90 backdrop-blur-md shadow-md rounded-full border border-gray-200 w-full max-w-4xl">
        <nav className="flex justify-between items-center w-full px-6 py-4">
          <Link to="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
          <span className="text-primary">Jan</span><span className="text-orange-500">Vaani</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
          <Link to="/map" className={getLinkClass('/map')}>Heatmap</Link>
          <Link to="/submit" className={getLinkClass('/submit')}>Submit</Link>
        </div>
        
        <div className="hidden md:block">
          <Link to="/submit" className="inline-block bg-orange-500 text-white text-sm px-6 py-2 rounded-xl font-bold hover:bg-orange-600 transition-all active:scale-95 duration-200 shadow-sm">
            Submit Complaint
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/" 
              className={getMobileLinkClass('/')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/submit" 
              className={getMobileLinkClass('/submit')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Submit Complaint
            </Link>
            <Link 
              to="/dashboard" 
              className={getMobileLinkClass('/dashboard')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              MP Dashboard
            </Link>
            <Link 
              to="/map" 
              className={getMobileLinkClass('/map')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Heatmap
            </Link>
          </div>
        </div>
      )}
    </header>
    </div>
  );
};

export default Navbar;
