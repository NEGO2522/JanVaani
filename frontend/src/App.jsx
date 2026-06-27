import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import CitizenPage from './pages/CitizenPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import MapPage from './pages/MapPage.jsx';
import PageTransition from './components/PageTransition.jsx';

// We extract Routes into a child component so it can use the `useLocation` hook
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    // AnimatePresence waits for the exit animation to finish before entering the new one
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/submit" 
          element={
            <PageTransition>
              <CitizenPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PageTransition>
              <DashboardPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/map" 
          element={
            <PageTransition>
              <MapPage />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}

export default App;
