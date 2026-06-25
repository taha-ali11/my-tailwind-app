'use client';

import NavBar from '../components/navbar';
import TextType from '../components/ui/Texttype';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero-bg min-h-screen relative overflow-hidden">
      <NavBar />
      
      <div className="container mx-auto px-4 md:px-8 pt-32 md:pt-40">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-vivid-lime/10 text-vivid-lime px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fadeInUp">
            <span className="w-2 h-2 bg-vivid-lime rounded-full animate-pulse"></span>
            Trusted by 500+ companies
          </div>
          
          <h1 className="hero-title text-5xl md:text-7xl font-bold leading-tight animate-fadeInUp">
            Build Amazing 
            <span className="text-vivid-lime block md:inline"> Digital Solutions</span>
          </h1>
          
          <div className="mt-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
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
          
          <p className="text-gray-600 dark:text-gray-300 mt-6 max-w-2xl text-lg animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            We build cutting-edge software solutions that drive business growth. 
            From web development to AI-powered applications.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-8 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <Link 
              href="/contact" 
              className="btn-primary px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-vivid-lime/25"
            >
              Get Free Audit
            </Link>
            <Link 
              href="/services" 
              className="px-8 py-3 rounded-full font-semibold border-2 border-dark-cyan text-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-300"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>

      {/* Image Area */}
      <div className="absolute bottom-20 md:bottom-32 right-4 md:right-16 w-[280px] md:w-[450px] animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
        <div className="w-full h-48 md:h-64 flex items-center justify-center">
          <img 
            src="/Assets/FL.png" 
            alt="IMG" 
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}