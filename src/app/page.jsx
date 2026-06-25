import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to My Tailwind App!</h1>
      </div>
    </>
  );
}
