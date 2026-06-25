'use client';

export default function Hero() {
    return (
        <>
            <section className="HeroSection bg-[#86aff0] h-screen relative">
                {/* Top Navigation */}
                <div className="flex justify-between items-center pt-8 px-16">
                    <div className="logo z-50 text-[#b8ff46] text-3xl font-serif font-bold">
                        IMG
                    </div>
                    <div className="toggle z-50 text-[#b8ff46] text-2xl font-serif font-bold">
                        ☰
                    </div>
                </div>

                {/* Main Content */}
                <div className="pl-16 mt-32">
                    <h1 className="text-blue-950 text-7xl font-serif font-bold leading-tight">
                        DevX
                    </h1>
                    <p className="text-blue-950 text-2xl font-serif mt-4">
                        Software Development Company
                    </p>
                </div>

                {/* Image Area */}
                <div className="absolute bottom-50 right-16">
                    <div className=" h-64 w-[500px] drop-shadow-2xl">
                        <div className="w-full h-full flex items-center justify-center text-blue-950 font-serif text-xl">
                            <img src="/Assets/FL.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}