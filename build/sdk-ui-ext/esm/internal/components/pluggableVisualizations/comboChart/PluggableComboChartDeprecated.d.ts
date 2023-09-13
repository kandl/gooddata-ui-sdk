import React from "react";
import { IExtendedReferencePoint, IReferencePoint, IVisConstruct } from "../../../interfaces/Visualization.js";
import { PluggableBaseChart } from "../baseChart/PluggableBaseChart.js";
export declare class PluggableComboChartDeprecated extends PluggableBaseChart {
    constructor(props: IVisConstruct);
    getExtendedReferencePoint(referencePoint: IReferencePoint): Promise<IExtendedReferencePoint>;
    protected renderConfigurationPanel(): React.ReactNode;
}
//# sourceMappingURL=PluggableComboChartDeprecated.d.ts.map