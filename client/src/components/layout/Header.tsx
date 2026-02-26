// Shared Header component
import { Navbar } from "./Navbar";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-30 bg-white border-b border-gray-200 overflow-x-hidden">
      <Navbar />
    </header>
  );
}
