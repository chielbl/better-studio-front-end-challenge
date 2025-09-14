export default function Loading() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="p-2 animate-spin drop-shadow-2xl bg-gradient-to-bl from-primary-300 via-primary-500 to-primary-700 h-32 w-32 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-primary-50 background-blur-md"></div>
      </div>
      <p className="font-bold">Loading...</p>
    </section>
  );
}
