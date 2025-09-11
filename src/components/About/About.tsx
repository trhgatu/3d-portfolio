"use client";
import gsap from "gsap";


import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {

    useGSAP(() => {
        const aboutTL = gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "top top",
                end: "+=200%",
                scrub: 1,
                pin: true,
                markers: true
            }
        });
        aboutTL
            .from(".about-title span", {
                opacity: 0,
                duration: 1,
                yPercent: -100,
                stagger: 0.5
            })



    }, [])

    const sectionTitle = "Aboutme.";

    return (
        <section id="about" className="bg-black min-h-screen px-6 py-24">
            <div className="mx-auto max-w-6xl items-center">
                <div className="about-title text-9xl font-share-tech-mono flex justify-center">
                    {sectionTitle.split("").map((char, idx) => (
                        <span key={idx} className="inline-block ">
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>
                <div className="about-content">
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-20">
                        <div className="about-left-col flex justify-center">
                            <span className="text-6xl"> LEFT</span>

                        </div>

                        <div className="about-right-col flex justify-center">
                            <span className="text-6xl"> Right</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}