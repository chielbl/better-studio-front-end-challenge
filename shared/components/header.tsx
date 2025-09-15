import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex gap-4 items-center justify-between shadow-xs rounded-full py-2 px-8 bg-primary-100">
      <Link href="https://betterstudio.io/">
        <Image
          src="https://betterstudio.io/assets/5_1752139754089-DUAhGH1Q.png"
          alt="BetterStudio Logo"
          width={120}
          height={32}
        />
      </Link>
      <h1 className="invisible sm:visible text-md lg:text-2xl">
        Chiel Bleyenbergh (Front-end Challenge)
      </h1>
      <Link
        href="/"
        className="bg-primary-500 text-primary-50 hover:bg-primary-600 px-4 py-2 rounded-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:-translate-y-0.5"
      >
        Home
      </Link>
    </header>
  );
}
