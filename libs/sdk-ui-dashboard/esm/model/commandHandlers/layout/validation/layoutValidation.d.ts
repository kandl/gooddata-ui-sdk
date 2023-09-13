import { IDashboardLayout } from "@gooddata/sdk-model";
import { ExtendedDashboardLayoutSection, ExtendedDashboardWidget } from "../../../types/layoutTypes.js";
export declare function validateSectionPlacement(layout: IDashboardLayout<ExtendedDashboardWidget>, index: number): boolean;
export declare function validateSectionExists(layout: IDashboardLayout<ExtendedDashboardWidget>, index: number): boolean;
export declare function validateItemPlacement(section: ExtendedDashboardLayoutSection, index: number): boolean;
export declare function validateItemExists(section: ExtendedDashboardLayoutSection, index: number): boolean;
