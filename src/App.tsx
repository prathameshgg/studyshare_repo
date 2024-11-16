import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import NotesPage from './pages/NotesPage';
import AboutPage from './pages/AboutPage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Features />
                  <Stats />
                  <FAQ />
                </>
              } />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;