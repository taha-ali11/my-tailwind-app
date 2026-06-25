'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ui/Theme';

const MinimalBubbleNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = ['Home', 'Services', 'About', 'Portfolio', 'Contact'];

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-5xl">
            <div className="
                bg-white/80 dark:bg-gray-900/80
                backdrop-blur-xl 
                rounded-full 
                px-4 md:px-6 py-3
                shadow-2xl shadow-blue-500/10
                border border-white/20 dark:border-gray-700/30
                flex items-center justify-between
                gap-2
            ">
                {/* Logo */}
                <Link href="/" className="
                    flex items-center gap-2
                    bg-gradient-to-r from-blue-500 to-purple-600 
                    text-white px-4 py-1.5 rounded-full
                    font-bold text-lg
                    shadow-md hover:shadow-xl
                    transition-all duration-300
                    hover:scale-105
                    shrink-0
                ">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    IMG
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1 lg:gap-2">
                    {links.map((link) => (
                        <Link
                            key={link}
                            href={`/${link.toLowerCase()}`}
                            className="
                                px-3 lg:px-4 py-1.5
                                rounded-full
                                text-gray-600 dark:text-gray-300 
                                hover:text-gray-900 dark:hover:text-white
                                hover:bg-gray-100/50 dark:hover:bg-gray-700/50
                                transition-all duration-300
                                text-sm font-medium
                            "
                        >
                            {link}
                        </Link>
                    ))}
                </div>

                {/* Right side: Theme Toggle + Mobile Toggle */}
                <div className="flex items-center gap-2">
                    {/* CTA - Desktop only */}
                    <Link
                        href="/contact"
                        className="
                            hidden md:block
                            px-4 lg:px-5 py-1.5
                            bg-gradient-to-r from-blue-500 to-purple-600
                            text-white
                            rounded-full
                            text-sm font-medium
                            shadow-md hover:shadow-xl
                            transition-all duration-300
                            hover:scale-105
                            shrink-0
                        "
                    >
                        Let's Talk
                    </Link>
                    
                    {/* Theme Toggle - Always visible */}
                    <ThemeToggle />
                    
                    {/* Mobile Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="
                            md:hidden 
                            w-10 h-10 
                            rounded-full 
                            bg-gray-100/50 dark:bg-gray-700/50 
                            hover:bg-gray-200/50 dark:hover:bg-gray-600/50 
                            flex items-center justify-center 
                            transition-colors
                            shrink-0
                        "
                        aria-label="Toggle menu"
                    >
                        <span className="text-gray-600 dark:text-gray-300 text-xl">
                            {isOpen ? '✕' : '☰'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="
                    md:hidden mt-3
                    bg-white/95 dark:bg-gray-900/95
                    backdrop-blur-xl
                    rounded-2xl p-4
                    shadow-2xl
                    border border-white/20 dark:border-gray-700/30
                    flex flex-col gap-2
                    animate-slideDown
                ">
                    {links.map((link) => (
                        <Link
                            key={link}
                            href={`/${link.toLowerCase()}`}
                            onClick={() => setIsOpen(false)}
                            className="
                                px-4 py-3
                                rounded-full
                                text-gray-600 dark:text-gray-300 
                                hover:text-gray-900 dark:hover:text-white
                                hover:bg-gray-100/50 dark:hover:bg-gray-700/50
                                transition-all duration-300
                                text-center
                                text-base
                            "
                        >
                            {link}
                        </Link>
                    ))}
                    
                    <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="
                            px-4 py-3
                            bg-gradient-to-r from-blue-500 to-purple-600
                            text-white
                            rounded-full
                            text-center font-medium
                            shadow-md
                            transition-all duration-300
                            hover:scale-105
                            text-base
                        "
                    >
                        Let's Talk
                    </Link>
                    
                    {/* No Theme Toggle in mobile menu since it's already in the navbar */}
                </div>
            )}

            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
        </nav>
    );
};

export default MinimalBubbleNav;