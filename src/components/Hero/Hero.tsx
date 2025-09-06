"use client";

export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-6 py-20 text-center">
      <p className="text-sm uppercase tracking-widest text-cyan-400/80 mb-4">
        trhgatu · 3D Portfolio
      </p>
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
        Hi, I&apos;m <span className="text-cyan-300">Tran Hoang Anh Tu</span>
      </h1>
      <h2 className="mt-3 text-2xl md:text-4xl font-semibold text-pink-400">
        Software Engineer · Frontend & 3D Enthusiast
      </h2>
      <p className="mt-6 max-w-2xl text-gray-300 text-lg">
        Welcome to my forge — where imagination meets interaction. I craft vibrant, responsive, and immersive web experiences.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href="#projects"
          className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-medium text-white hover:bg-cyan-600 transition"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}