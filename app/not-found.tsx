import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-9xl font-extrabold text-center">Oops!</h1>
      <h2 className="text-2xl font-bold text-gray-800">404 - PAGE NOT FOUND</h2>
      <p className="text-center text-gray-500 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="bg-primary-200 hover:bg-primary-300 hover:text-primary-900 px-4 py-2 rounded-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:-translate-y-0.5"
      >
        GO TO HOMEPAGE
      </Link>
    </div>
  );
}
