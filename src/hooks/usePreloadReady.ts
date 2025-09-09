// hooks/usePreloadReady.ts
import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

export function usePreloadReady() {
    const { progress, active } = useProgress();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!active && progress === 100) {
            setReady(true)
        }
    }, [active, progress]);

    return ready;
}
