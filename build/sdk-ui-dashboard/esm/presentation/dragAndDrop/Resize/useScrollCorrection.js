// (C) 2022 GoodData Corporation
import { useEffect, useMemo, useState } from "react";
const emptyPosition = {
    x: 0,
    y: 0,
};
export function useScrollCorrection(getDimensions, isActive = true) {
    const [currentPosition, setCurrentPosition] = useState(emptyPosition);
    const initialPosition = useMemo(() => {
        if (isActive) {
            return getDimensions();
        }
        else {
            return emptyPosition;
        }
    }, [isActive, getDimensions]);
    useEffect(() => {
        const updatePosition = () => {
            setCurrentPosition(getDimensions);
        };
        if (isActive) {
            document.addEventListener("scroll", updatePosition, true);
            updatePosition();
        }
        return () => document.removeEventListener("scroll", updatePosition, true);
    }, [isActive, getDimensions]);
    const scrollCorrection = useMemo(() => {
        return {
            x: currentPosition.x - initialPosition.x,
            y: currentPosition.y - initialPosition.y,
        };
    }, [currentPosition, initialPosition]);
    return {
        initialPosition,
        currentPosition,
        scrollCorrection,
    };
}
//# sourceMappingURL=useScrollCorrection.js.map