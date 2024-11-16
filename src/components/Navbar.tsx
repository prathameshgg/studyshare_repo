import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, LogIn, Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">StudyShare</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${isActive('/') ? 'text-indigo-600' : 'text-gray-700'} hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium`}
            >
              Home
            </Link>
            <Link
              to="/notes"
              className={`${isActive('/notes') ? 'text-indigo-600' : 'text-gray-700'} hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium`}
            >
              Notes
            </Link>
            <Link
              to="/about"
              className={`${isActive('/about') ? 'text-indigo-600' : 'text-gray-700'} hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium`}
            >
              About
            </Link>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.name}</span>
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/profile/uploads"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Uploads
                    </Link>
                    <Link
                      to="/profile/downloads"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Downloads
                    </Link>
                    <Link
                      to="/profile/saved"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Saved Notes
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-indigo-700"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'} hover:text-indigo-600 hover:bg-gray-50`}
            >
              Home
            </Link>
            <Link
              to="/notes"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/notes') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'} hover:text-indigo-600 hover:bg-gray-50`}
            >
              Notes
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'} hover:text-indigo-600 hover:bg-gray-50`}
            >
              About
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile/uploads"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  My Uploads
                </Link>
                <Link
                  to="/profile/downloads"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  My Downloads
                </Link>
                <Link
                  to="/profile/saved"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Saved Notes
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}