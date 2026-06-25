'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ui/Theme';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['Home', 'Services', 'About', 'Portfolio', 'Contact'];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="navbar-bg rounded-full px-4 md:px-6 py-3 border flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-dark-cyan to-vivid-lime flex items-center justify-center text-white font-bold text-sm">
            IMG
          </div>
          <span className="navbar-text font-bold text-lg hidden sm:block">IMG</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {links.map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="navbar-text px-3 lg:px-4 py-1.5 rounded-full hover:bg-dark-cyan/10 transition-all duration-300 text-sm font-medium"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden md:block px-4 lg:px-5 py-1.5 bg-vivid-lime text-slate-blue rounded-full text-sm font-semibold shadow-md hover:shadow-vivid-lime/25 transition-all duration-300 hover:scale-105 shrink-0"
          >
            Get Free Audit
          </Link>
          
          <ThemeToggle />
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 flex items-center justify-center transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            <span className="navbar-text text-xl">
              {isOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 dark:border-gray-700/30 flex flex-col gap-2 animate-slideDown">
          {links.map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="navbar-text px-4 py-3 rounded-full hover:bg-dark-cyan/10 transition-all duration-300 text-center text-base"
            >
              {link}
            </Link>
          ))}
          
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="px-4 py-3 bg-vivid-lime text-slate-blue rounded-full text-center font-semibold shadow-md transition-all duration-300 hover:scale-105 text-base"
          >
            Get Free Audit
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;