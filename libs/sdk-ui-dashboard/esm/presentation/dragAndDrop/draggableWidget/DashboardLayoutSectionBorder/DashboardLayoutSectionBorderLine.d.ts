import React from "react";
import { DashboardLayoutSectionBorderStatus } from "./types.js";
interface IDashboardLayoutSectionBorderLineProps {
    position: "top" | "bottom";
    status: DashboardLayoutSectionBorderStatus;
}
export declare const DashboardLayoutSectionBorderLine: React.FC<IDashboardLayoutSectionBorderLineProps>;
export {};
