import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditorPage from './pages/EditorPage';
import DashboardPage from './pages/DashboardPage';
import useLandingPageStore from './store/landingPageStore';

function App() {
  const { isDarkMode, toggleDarkMode } = useLandingPageStore();

  return (
    <Router>
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        <main className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/editor/:id" element={<EditorPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;