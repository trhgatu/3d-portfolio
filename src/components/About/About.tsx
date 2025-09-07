import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="bg-black text-white min-h-screen px-6 py-24">
            <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Avatar */}
                <div className="flex justify-center">
                    <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-cyan-400 shadow-lg">
                        <Image
                            src="/avatar.jpg"
                            alt="Infinity Avatar"
                            className="h-full w-full object-cover"
                            width={200}
                            height={200}
                        />
                    </div>
                </div>


                {/* Description */}
                <div className="text-left">
                    <h3 className="text-3xl font-bold text-cyan-300 mb-4">About Me</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        I&apos;m Tran Hoang Anh Tu, a passionate software engineer based in Vietnam. I specialize in modern frontend development and 3D interaction using React, Three.js, and GSAP.
                    </p>
                    <p className="mt-4 text-gray-400 text-base">
                        From immersive portfolios to dynamic user interfaces, I bring code and creativity together to forge experiences that feel alive. This isn&apos;t just work — it&apos;s my craft.
                    </p>
                </div>
            </div>
        </section>
    )
}