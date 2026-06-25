// components/Navbar.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from '../Theme';
import Hero from './Hero';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const smoothScrollTo = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // Height of your navbar (h-16 = 4rem = 64px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home', sectionId: 'home' },
    { name: 'About', href: '#about', sectionId: 'about' },
    {
      name: 'Services',
      href: '#services',
      sectionId: 'services',
      dropdown: [
        { name: 'Web Design', href: '#web-design', sectionId: 'web-design' },
        { name: 'Development', href: '#development', sectionId: 'development' },
        { name: 'Marketing', href: '#marketing', sectionId: 'marketing' },
      ],
    },
    { name: 'Contact', href: '#contact', sectionId: 'contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  return (
    <nav
      className={`fixed h-16 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white dark:bg-blue-500 shadow-lg' 
          : 'bg-blue-800 dark:bg-blue-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => smoothScrollTo(e, 'home')}
              className="cursor-pointer"
            >
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400 transition-colors">
                Logo
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`${
                        isActive(link.href)
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      } px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center`}
                    >
                      {link.name}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 invisible group-hover:visible transition-all duration-200">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => smoothScrollTo(e, item.sectionId)}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => smoothScrollTo(e, link.sectionId)}
                    className={`${
                      isActive(link.href)
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    } px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer`}
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Get Started
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg transition-colors">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-between transition-colors"
                    >
                      {link.name}
                      <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className="pl-4 space-y-1">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => {
                              smoothScrollTo(e, item.sectionId);
                              setIsOpen(false);
                            }}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => {
                      smoothScrollTo(e, link.sectionId);
                      setIsOpen(false);
                    }}
                    className={`${
                      isActive(link.href)
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                    } block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer`}
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700 transition-colors">
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 mt-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}

<Hero/>
    </nav>
  );
};

export default Navbar;