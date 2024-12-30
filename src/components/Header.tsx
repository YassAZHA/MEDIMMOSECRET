import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './common/Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-12">
            {[
              { to: "/", label: "Accueil" },
              { to: "/services", label: "Services" },
              { to: "/about", label: "À propos" },
              { to: "/properties", label: "Biens" },
              { to: "/contact", label: "Contact" }
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-gray-800 hover:text-primary font-display text-base tracking-wide transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t border-gray-100">
            <div className="flex flex-col space-y-6">
              {[
                { to: "/", label: "Accueil" },
                { to: "/services", label: "Services" },
                { to: "/about", label: "À propos" },
                { to: "/properties", label: "Biens" },
                { to: "/contact", label: "Contact" }
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-gray-800 hover:text-primary font-display text-lg tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}