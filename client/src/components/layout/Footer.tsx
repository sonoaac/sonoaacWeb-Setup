// Shared Footer component
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-12 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="text-center text-gray-600">
          <p className="mb-2">© {year} Sonoaac. All rights reserved.</p>
          <p className="text-sm">Building products and services that matter.</p>
        </div>
      </div>
    </footer>
  );
}
