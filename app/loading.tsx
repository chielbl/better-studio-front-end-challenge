import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Loader />
    </section>
  );
}
