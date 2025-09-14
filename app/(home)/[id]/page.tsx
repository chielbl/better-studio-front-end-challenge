import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface UserDetailProps {
  params: Promise<{ id: string }>;
}
export default async function UserDetail({ params }: UserDetailProps) {
  const { id } = await params;

  return (
    <section className="flex flex-col gap-8 min-h-screen">
      <Link href="/" className="flex gap-4 items-center">
        <ChevronLeft />
        <h2 className="text-4xl font-bold">Detail page (#{id})</h2>
      </Link>
    </section>
  );
}
