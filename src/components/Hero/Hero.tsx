"use client";

export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-6 py-20">
      <p className="text-sm uppercase tracking-widest text-cyan-400/80 mb-4">
        trhgatu · 3D Portfolio
      </p>
      <h1 className="text-4xl md:text-6xl font-bold text-center">
        Forged in <span className="text-cyan-300">Code</span>,
        <br />Built with <span className="text-pink-400">Passion</span>
      </h1>
      <p className="mt-6 max-w-xl text-center text-gray-300 text-lg">
        Welcome to trhgatu&apos;s forge. Explore projects, ideas, and everything crafted with love.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="#projects"
          className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-cyan-600 transition"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}