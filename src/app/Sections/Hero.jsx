'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import NavBar from '../components/navbar';
import TextType from '../components/ui/texttype';
import Link from 'next/link';

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="hero-bg min-h-screen relative overflow-hidden">
      <NavBar />

      <div className="container mx-auto px-4 md:px-8 pt-28 md:pt-32">
        <div className="max-w-4xl">
          <h1 className="hero-title text-5xl md:text-7xl font-bold leading-tight animate-fadeInUp">
            Build Amazing
            <span className="text-vivid-lime block md:inline"> Digital Solutions</span>
          </h1>

          <div 
            className="mt-4 animate-fadeInUp" 
            style={{ animationDelay: isMounted ? '0.2s' : '0s' }}
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
              className="hero-subtitle text-xl md:text-2xl font-serif"
              cursorClassName="hero-subtitle text-xl md:text-2xl font-serif"
              loop={true}
              initialDelay={500}
            />
          </div>

          <p 
            className="text-gray-600 dark:text-gray-300 mt-6 max-w-2xl text-lg animate-fadeInUp" 
            style={{ animationDelay: isMounted ? '0.4s' : '0s' }}
          >
            We build cutting-edge software solutions that drive business growth.
            From web development to AI-powered applications.
          </p>

          <div 
            className="flex flex-wrap gap-4 mt-8 animate-fadeInUp" 
            style={{ animationDelay: isMounted ? '0.6s' : '0s' }}
          >
            <Link
              href="/contact"
              className="btn-primary px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-vivid-lime/25 transition-all duration-300 hover:scale-105 active:scale-95"
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

      {/* Image Area - Fixed with Next.js Image component */}
      <div 
        className="absolute bottom-20 md:bottom-32 right-4 md:right-16 w-[280px] md:w-[450px] animate-fadeInUp" 
        style={{ animationDelay: isMounted ? '0.8s' : '0s' }}
      >
        <div className="relative w-full h-48 md:h-64">
          {!imageError ? (
            <Image
              src="/assets/fl.png"
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
              <span className="text-gray-500 dark:text-gray-400 text-sm text-center px-4">
                Illustration<br />
                <span className="text-xs">FL.png</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}