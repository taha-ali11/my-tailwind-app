'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ui/theme';

// Navigation links configuration
const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' }
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Check if link is active
  const isActiveLink = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path);
  };

  return (
    <nav 
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-5xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="rounded-full px-4 md:px-6 py-3 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg shadow-slate-200/20 dark:shadow-slate-800/20">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-vivid-lime rounded-full"
          aria-label="IMG Home page"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-dark-cyan to-vivid-lime flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-105 shadow-md shadow-vivid-lime/20">
            {/* Removed IMG text - just the gradient circle */}
          </div>
          <span className="font-bold text-lg hidden sm:block text-slate-800 dark:text-slate-200">
            IMG
          </span>
        </Link>

        {/* Desktop Links */}
        <div 
          className="hidden md:flex items-center gap-1 lg:gap-2"
          role="menubar"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              role="menuitem"
              aria-current={isActiveLink(link.path) ? 'page' : undefined}
              className={`px-3 lg:px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium ${
                isActiveLink(link.path)
                  ? 'bg-vivid-lime text-slate-900 dark:bg-vivid-lime dark:text-slate-900'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-vivid-lime hover:text-slate-900 dark:hover:bg-vivid-lime dark:hover:text-slate-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="px-4 py-3 bg-[#a2f6a2] text-[#2c2c84] rounded-full text-center font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:bg-dark-cyan hover:text-blue-700 active:scale-95 text-base focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2"
            aria-label="Get a free audit of your software needs"
          >
            Free Audit
          </Link>
          
          <ThemeToggle />
          
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-slate-100/50 dark:bg-slate-700/50 hover:bg-vivid-lime hover:text-slate-900 dark:hover:bg-vivid-lime dark:hover:text-slate-900 flex items-center justify-center transition-all duration-300 shrink-0 focus:outline-none focus:ring-2 focus:ring-vivid-lime hover:scale-105"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-5 h-5 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-900"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="menu"
        aria-hidden={!isOpen}
        className="md:hidden mt-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-slate-200/20 dark:border-slate-700/30 flex flex-col gap-2"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
        }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            role="menuitem"
            aria-current={isActiveLink(link.path) ? 'page' : undefined}
            onClick={() => setIsOpen(false)}
            className={`px-4 py-3 rounded-full transition-all duration-300 text-center text-base ${
              isActiveLink(link.path)
                ? 'bg-vivid-lime text-slate-900 dark:bg-vivid-lime dark:text-slate-900'
                : 'text-slate-700 dark:text-slate-300 hover:bg-vivid-lime hover:text-slate-900 dark:hover:bg-vivid-lime dark:hover:text-slate-900'
            }`}
          >
            {link.name}
          </Link>
        ))}
        
        <Link
          href="/contact"
          onClick={() => setIsOpen(false)}
          className="px-4 py-3 bg-[#00ff00] text-[#3636f3] rounded-full text-center font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:bg-dark-cyan hover:text-blue-700 active:scale-95 text-base focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2"
          role="menuitem"
          aria-label="Get a free audit of your software needs"
        >
          Free Audit
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;