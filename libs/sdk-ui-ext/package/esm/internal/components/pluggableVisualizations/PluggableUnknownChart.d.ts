import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IExecutionFactory, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { IInsightDefinition } from "@gooddata/sdk-model";
import { AbstractPluggableVisualization } from "./AbstractPluggableVisualization";
import { IExtendedReferencePoint, IVisConstruct, IReferencePoint, IVisProps } from "../../interfaces/Visualization";
export type IIntlLocalizedUnknownVisualizationClass = WrappedComponentProps;
export declare class LocalizedUnknownVisualizationClass extends React.Component<IIntlLocalizedUnknownVisualizationClass> {
    private errorDetails;
    constructor(props: IIntlLocalizedUnknownVisualizationClass);
    render(): JSX.Element;
}
export declare const IntlLocalizedUnknownVisualizationClass: React.FC<import("react-intl").WithIntlProps<IIntlLocalizedUnknownVisualizationClass>> & {
    WrappedComponent: React.ComponentType<IIntlLocalizedUnknownVisualizationClass>;
};
export declare class PluggableUnknownChart extends AbstractPluggableVisualization {
    private renderFun;
    constructor(props: IVisConstruct);
    getExtendedReferencePoint(referencePoint: IReferencePoint): Promise<IExtendedReferencePoint>;
    getExecution(_options: IVisProps, _insight: IInsightDefinition, _executionFactory: IExecutionFactory): IPreparedExecution;
    protected renderConfigurationPanel(_insight: IInsightDefinition): void;
    protected renderVisualization(options: IVisProps, _insight: IInsightDefinition, _executionFactory: IExecutionFactory): void;
    unmount(): void;
}
//# sourceMappingURL=PluggableUnknownChart.d.ts.map