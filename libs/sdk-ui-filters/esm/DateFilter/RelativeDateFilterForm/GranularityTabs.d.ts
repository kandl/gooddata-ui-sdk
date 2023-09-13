import React from "react";
import { DateFilterGranularity } from "@gooddata/sdk-model";
export interface IGranularityTabsProps {
    availableGranularities: DateFilterGranularity[];
    selectedGranularity: DateFilterGranularity;
    onSelectedGranularityChange: (granularity: DateFilterGranularity) => void;
}
export declare const GranularityTabs: React.FC<IGranularityTabsProps>;
