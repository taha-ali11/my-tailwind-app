'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import NavBar from '../components/navbar';
import TextType from '../components/ui/testtype';
import Link from 'next/link';

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Inline styles for animation
  const fadeStyles = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`
  });

  return (
    <section className="hero-bg min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-cyan-950">
      <NavBar />

      <div className="container mx-auto px-4 md:px-8 pt-28 md:pt-32">
        <div className="max-w-4xl">
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight text-slate-900 dark:text-white"
            style={fadeStyles(0)}
          >
            Build Amazing
            <span className="text-vivid-lime block md:inline"> Digital Solutions</span>
          </h1>

          <div
            className="mt-4"
            style={fadeStyles(0.2)}
          >
            <TextType
              text={[
                "Software Development Company",
                "Building Digital Solutions",
                "Innovating the Future"
              ]}
              typingSpeed={50}
              pauseDuration={2000}
              deletingSpeed={30}
              showCursor={true}
              cursorCharacter="|"
              className="text-xl md:text-2xl font-serif text-cyan-700 dark:text-cyan-300"
              cursorClassName="text-xl md:text-2xl font-serif text-cyan-700 dark:text-cyan-300"
              loop={true}
              initialDelay={500}
            />
          </div>

          <p
            className="text-slate-600 dark:text-slate-300 mt-6 max-w-2xl text-lg"
            style={fadeStyles(0.4)}
          >
            We build cutting-edge software solutions that drive business growth.
            From web development to AI-powered applications.
          </p>

          <div
            className="flex flex-wrap gap-4 mt-8"
            style={fadeStyles(0.6)}
          >
            <Link
              href="/contact"
              className="px-4 py-3 bg-[#94fc32] text-[#3636f3] rounded-full text-center font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:bg-dark-cyan hover:text-blue-700 active:scale-95 text-base focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2"
              aria-label="Get a free audit of your software needs"
            >
              Get Free Audit
            </Link>
            <Link
              href="/services"
              className="px-8 py-3 rounded-full font-semibold border-2 border-dark-cyan text-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="View our software development services"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>

      {/* Image Area */}
      <div
        className="absolute bottom-20 md:bottom-32 right-4 md:right-16 w-[280px] md:w-[450px]"
        style={fadeStyles(0.8)}
      >
        <div className="relative w-full h-48 md:h-64">
          {!imageError ? (
            <Image
              src="/public/assets/heroimage.Webp"
              alt="Digital transformation and software development illustration showing modern technology solutions"
              fill
              className="object-contain rounded-lg"
              priority
              loading="eager"
              quality={85}
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 280px, 450px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-dark-cyan/20 to-vivid-lime/20 rounded-lg flex items-center justify-center border-2 border-dashed border-dark-cyan/30">
              <span className="text-slate-600 dark:text-slate-400 text-sm text-center px-4">
                Illustration<br />
                <span className="text-xs">FL.png</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-vivid-lime/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/2 w-96 h-96 bg-dark-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none"></div>
    </section>
  );
}