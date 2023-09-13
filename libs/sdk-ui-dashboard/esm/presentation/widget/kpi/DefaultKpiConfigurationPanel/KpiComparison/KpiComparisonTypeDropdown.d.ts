import React from "react";
import { IKpiComparisonTypeComparison } from "@gooddata/sdk-model";
interface IKpiComparisonTypeDropdownProps {
    comparisonType: IKpiComparisonTypeComparison;
    onComparisonTypeChanged: (newComparisonTypeId: IKpiComparisonTypeComparison) => void;
}
export declare const KpiComparisonTypeDropdown: React.FC<IKpiComparisonTypeDropdownProps>;
export {};
