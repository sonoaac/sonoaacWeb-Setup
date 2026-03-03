import { Navbar } from "./Navbar";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-[100] bg-black border-b border-green-900/50">
      <Navbar />
    </header>
  );
}
