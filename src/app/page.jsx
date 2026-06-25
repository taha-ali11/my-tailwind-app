// app/page.jsx
import Link from 'next/link';  // ← Add this import
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600 dark:text-blue-400 transition-colors">
              Welcome to my Tailwind CSS App!
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 transition-colors">
              This is the home page. You can customize this page by editing the app/page.jsx file.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/about" 
                className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Get Started
              </Link>
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}