import React from "react";
import { IMeasureMetadataObject } from "@gooddata/sdk-model";
interface IMetricDropdownItemProps {
    item?: IMeasureMetadataObject;
    isSelected?: boolean;
    unlistedTitle: string;
    unlistedIconTitle: string;
    isMobile?: boolean;
    onClick?: () => void;
}
export declare const MetricDropdownItem: React.FC<IMetricDropdownItemProps>;
export {};
