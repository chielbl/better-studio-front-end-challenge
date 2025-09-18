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
      <h1 className="flex-1 text-center text-md lg:text-2xl">
        Chiel Bleyenbergh (Front-end Challenge)
      </h1>
    </header>
  );
}
