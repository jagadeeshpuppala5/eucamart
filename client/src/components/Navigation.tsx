
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun, ShoppingCart, User, Building } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useLocation } from 'wouter';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigateToPage = (path: string) => {
    setLocation(path);
    setIsMenuOpen(false);
  };

  const goHome = () => {
    setLocation('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={goHome}
              className="text-2xl font-bold text-eucalyptus-600 hover:text-eucalyptus-700 transition-colors font-playfair"
            >
              🌿 EucaMart
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={goHome}
                className="nav-link text-foreground/80 hover:text-eucalyptus-600 px-3 py-2 text-sm font-medium transition-all duration-300"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setLocation('/');
                  setTimeout(() => scrollToSection('products'), 100);
                }}
                className="nav-link text-foreground/80 hover:text-eucalyptus-600 px-3 py-2 text-sm font-medium transition-all duration-300"
              >
                Products
              </button>
              <button
                onClick={() => {
                  setLocation('/');
                  setTimeout(() => scrollToSection('services'), 100);
                }}
                className="nav-link text-foreground/80 hover:text-eucalyptus-600 px-3 py-2 text-sm font-medium transition-all duration-300"
              >
                Services
              </button>
              <button
                onClick={() => {
                  setLocation('/');
                  setTimeout(() => scrollToSection('testimonials'), 100);
                }}
                className="nav-link text-foreground/80 hover:text-eucalyptus-600 px-3 py-2 text-sm font-medium transition-all duration-300"
              >
                Testimonials
              </button>
              <button
                onClick={() => {
                  setLocation('/');
                  setTimeout(() => scrollToSection('about'), 100);
                }}
                className="nav-link text-foreground/80 hover:text-eucalyptus-600 px-3 py-2 text-sm font-medium transition-all duration-300"
              >
                About
              </button>
              <button
                onClick={() => {
                  setLocation('/');
                  setTimeout(() => scrollToSection('team'), 100);
                }}
                className="nav-link text-foreground/80 hover:text-eucalyptus-600 px-3 py-2 text-sm font-medium transition-all duration-300"
              >
                Team
              </button>
              <button
                onClick={() => {
                  setLocation('/');
                  setTimeout(() => scrollToSection('contact'), 100);
                }}
                className="nav-link text-foreground/80 hover:text-eucalyptus-600 px-3 py-2 text-sm font-medium transition-all duration-300"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => navigateToPage('/bulk-orders')}
              variant="outline"
              size="sm"
              className="border-eucalyptus-600 text-eucalyptus-600 hover:bg-eucalyptus-600 hover:text-white transition-all duration-300"
            >
              <Building className="w-4 h-4 mr-2" />
              Bulk Orders
            </Button>
            <Button
              onClick={() => navigateToPage('/login')}
              variant="outline"
              size="sm"
              className="border-eucalyptus-600 text-eucalyptus-600 hover:bg-eucalyptus-600 hover:text-white transition-all duration-300"
            >
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button
              onClick={() => navigateToPage('/cart')}
              variant="outline"
              size="sm"
              className="border-eucalyptus-600 text-eucalyptus-600 hover:bg-eucalyptus-600 hover:text-white transition-all duration-300"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
            </Button>
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="text-foreground/80 hover:bg-secondary transition-all duration-300"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="text-foreground/80"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
              className="text-foreground/80"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={goHome}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-eucalyptus-600 hover:bg-secondary rounded-md transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                setLocation('/');
                setTimeout(() => scrollToSection('products'), 100);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-eucalyptus-600 hover:bg-secondary rounded-md transition-colors"
            >
              Products
            </button>
            <button
              onClick={() => {
                setLocation('/');
                setTimeout(() => scrollToSection('services'), 100);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-eucalyptus-600 hover:bg-secondary rounded-md transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => {
                setLocation('/');
                setTimeout(() => scrollToSection('testimonials'), 100);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-eucalyptus-600 hover:bg-secondary rounded-md transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => {
                setLocation('/');
                setTimeout(() => scrollToSection('about'), 100);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-eucalyptus-600 hover:bg-secondary rounded-md transition-colors"
            >
              About
            </button>
            <button
              onClick={() => {
                setLocation('/');
                setTimeout(() => scrollToSection('team'), 100);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-eucalyptus-600 hover:bg-secondary rounded-md transition-colors"
            >
              Team
            </button>
            <button
              onClick={() => {
                setLocation('/');
                setTimeout(() => scrollToSection('contact'), 100);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground/80 hover:text-eucalyptus-600 hover:bg-secondary rounded-md transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => navigateToPage('/shop')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-eucalyptus-600 hover:bg-eucalyptus-50 dark:hover:bg-eucalyptus-900/20 rounded-md transition-colors"
            >
              🛍️ Shop Now
            </button>
            <div className="border-t border-border pt-2 mt-2">
              <button
                onClick={() => navigateToPage('/bulk-orders')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-eucalyptus-600 hover:bg-secondary rounded-md transition-colors"
              >
                <Building className="w-4 h-4 mr-2 inline" />
                Bulk Orders
              </button>
              <button
                onClick={() => navigateToPage('/login')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-eucalyptus-600 hover:bg-secondary rounded-md transition-colors"
              >
                <User className="w-4 h-4 mr-2 inline" />
                Login
              </button>
              <button
                onClick={() => navigateToPage('/cart')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-eucalyptus-600 hover:bg-secondary rounded-md transition-colors"
              >
                <ShoppingCart className="w-4 h-4 mr-2 inline" />
                Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
