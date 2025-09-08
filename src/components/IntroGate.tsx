// components/IntroGate.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useIntroStore } from "@/app/stores/introStore";

gsap.registerPlugin(useGSAP);

export default function IntroGate({ children }: { children: React.ReactNode }) {
    const overlayRef = useRef(null);
    const setIntroPlayed = useIntroStore((state) => state.setIntroPlayed);

    useGSAP(() => {
        requestAnimationFrame(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".hero-text-mini span", {
                y: 40,
                opacity: 0,
                stagger: 0.05,
                duration: 0.6,
            })
                .to(overlayRef.current, {
                    autoAlpha: 0,
                    duration: 0.5,
                    delay: 0.2,
                    onComplete: () => {
                        setIntroPlayed();
                        document.documentElement.classList.remove("overflow-hidden");
                    },
                });
        });
    });


    return (
        <>
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[9999] bg-black pointer-events-none"
            ></div>

            <div className="site">{children}</div>
        </>
    );
}
