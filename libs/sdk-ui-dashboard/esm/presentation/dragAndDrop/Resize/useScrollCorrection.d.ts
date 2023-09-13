import { XYCoord } from "react-dnd";
export declare function useScrollCorrection(getDimensions: () => DOMRect, isActive?: boolean): {
    initialPosition: XYCoord;
    currentPosition: XYCoord;
    scrollCorrection: XYCoord;
};
