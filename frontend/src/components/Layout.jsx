import React from 'react';
import Navbar from './Navbar.jsx';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />
      <main className="flex-grow w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
