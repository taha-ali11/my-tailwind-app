import Link from 'next/link'; 

export default function Hero() {

    return (
        <>  
        <div className="h-screen flex items-center justify-center bg-gray-900">
            <div className="relative isolate overflow-hidden  bg-gray-500 py-24 sm:py-32">
                <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt=""
                    className="absolute inset-0 -z-10 h-max w-max object-cover object-center md:object-center"
                />
                <div className="absolute inset-0 -z-10 bg-gray-900/90" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Welcome to Our Website</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Discover our amazing products and services. We are committed to providing the best experience for our customers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}