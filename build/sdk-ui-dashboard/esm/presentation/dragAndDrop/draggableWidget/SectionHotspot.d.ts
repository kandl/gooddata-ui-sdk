import React from "react";
export type RowPosition = "above" | "below";
interface ISectionHotspotProps {
    index: number;
    targetPosition?: RowPosition;
}
export declare const SectionHotspot: React.FC<ISectionHotspotProps>;
export {};
