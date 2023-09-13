import React from "react";
interface IHotspotProps {
    sectionIndex: number;
    itemIndex: number;
    isLastInSection?: boolean;
    isEndingHotspot?: boolean;
    classNames?: string;
    dropZoneType: "prev" | "next";
}
export declare const Hotspot: React.FC<IHotspotProps>;
export {};
