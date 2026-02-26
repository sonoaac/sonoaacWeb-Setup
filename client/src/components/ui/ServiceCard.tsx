import { Link } from "wouter";

// Shared Service Card component
export default function ServiceCard({ title, link, children }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between h-full">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="mb-4 text-gray-700">{children}</div>
      <Link href={link}>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold mt-auto">Learn More</button>
      </Link>
    </div>
  );
}
