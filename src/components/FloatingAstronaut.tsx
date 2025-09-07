"use client";

import { forwardRef, ReactNode } from "react";
import { Float } from "@react-three/drei";

import { Astronaut } from "@/components/Astronaut";
import { Group } from "three";

type FloatingAstronautProps = {
    floatSpeed?: number;
    rotationIntensity?: number;
    floatIntensity?: number;
    floatingRange?: [number, number];
    children?: ReactNode;
};

const FloatingAstronaut = forwardRef<Group, FloatingAstronautProps>(
    (
        {
            floatSpeed = 0,
            rotationIntensity = 1,
            floatIntensity = 1,
            floatingRange = [-0.1, 0.1],
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <group ref={ref} {...props}>
                <Float
                    speed={floatSpeed}
                    rotationIntensity={rotationIntensity}
                    floatIntensity={floatIntensity}
                    floatingRange={floatingRange}
                >
                    {children}
                    <Astronaut />
                </Float>
            </group>
        );
    },
);

FloatingAstronaut.displayName = "FloatingAstronaut";

export default FloatingAstronaut;