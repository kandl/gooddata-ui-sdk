import React from "react";
import { IKpiComparisonDirection } from "@gooddata/sdk-model";
interface IKpiComparisonDirectionDropdownProps {
    comparisonDirection: IKpiComparisonDirection | undefined;
    onComparisonDirectionChanged: (newComparisonDirectionId: IKpiComparisonDirection) => void;
}
export declare const KpiComparisonDirectionDropdown: React.FC<IKpiComparisonDirectionDropdownProps>;
export {};
