import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-6">
          — Error
        </span>
        <h1 className="text-6xl md:text-8xl font-bold text-green-900 mb-4">404</h1>
        <p className="text-green-500 text-sm mb-8 uppercase tracking-[0.2em]">
          Page not found
        </p>
        <Link href="/">
          <button className="px-6 py-3 bg-green-400 text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-green-300 transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
