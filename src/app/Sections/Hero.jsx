'use client';
import NavBar from '../components/navbar';
import Link from 'next/link';
import TextType from '@/app/components/ui/Texttype';

export default function Hero() {
    return (
        <>
            <section className="
                HeroSection 
                min-h-screen 
                bg-[#d7e7ff] dark:bg-gray-900 
                relative 
                transition-colors duration-300
            ">
                {/* Top Navigation */}
                <NavBar />

                {/* Main Content */}
                <div className="pl-8 md:pl-16 mt-36 md:mt-32 lg:mt-46">
                    <h1 className="
                        text-blue-950 dark:text-white 
                        text-5xl md:text-7xl 
                        font-serif font-bold 
                        leading-tight
                        transition-colors duration-300
                    ">
                        DevX
                    </h1>

                    <div className="mt-4">
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
                            cursorCharacter="_"
                            className="
                                text-blue-700 dark:text-blue-300 
                                text-xl md:text-2xl 
                                font-serif
                                transition-colors duration-300
                            "
                            cursorClassName="
                                text-blue-700 dark:text-blue-300 
                                text-xl md:text-2xl 
                                font-serif
                            "
                            loop={true}
                            initialDelay={500}
                            variableSpeed={{ min: 40, max: 80 }}
                            cursorBlinkDuration={0.5}
                        />
                    </div>
                </div>

                {/* Image Area */}
                <div className="
                    absolute 
                    bottom-24 md:bottom-32 
                    right-5  md:right-16 
                    w-[300px] md:w-[500px] 
                    drop-shadow-2xl 
                ">
                    <div className="
                        w-full 
                        h-48 md:h-64 
                        flex items-center justify-center 
                        text-blue-950 dark:text-white 
                        font-serif text-xl
                        transition-colors duration-300
                    ">
                        <img
                            src="/Assets/FL.png"
                            alt="IMG"
                            className="
                                w-full h-full 
                                object-contain 
                                rounded-lg
                                filter dark:brightness-90
                            "
                        />
                    </div>
                </div>
            </section>
        </>
    );
}