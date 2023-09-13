import React from "react";
import { ChartType } from "@gooddata/sdk-ui";
import { IReferences, IVisualizationProperties } from "../../interfaces/Visualization.js";
import { IColorConfiguration } from "../../interfaces/Colors.js";
import { IInsightDefinition, ISettings } from "@gooddata/sdk-model";
export interface IConfigurationPanelContentProps<PanelConfig = any> {
    properties?: IVisualizationProperties;
    references?: IReferences;
    propertiesMeta?: any;
    colors?: IColorConfiguration;
    locale: string;
    type?: ChartType;
    isError?: boolean;
    isLoading?: boolean;
    insight?: IInsightDefinition;
    featureFlags?: ISettings;
    axis?: string;
    pushData?(data: any): void;
    panelConfig?: PanelConfig;
}
export default abstract class ConfigurationPanelContent<T extends IConfigurationPanelContentProps = IConfigurationPanelContentProps> extends React.PureComponent<T> {
    static defaultProps: IConfigurationPanelContentProps;
    protected supportedPropertiesList: string[];
    render(): JSX.Element;
    protected abstract renderConfigurationPanel(): React.ReactNode;
    protected isControlDisabled(): boolean;
    protected renderColorSection(): React.ReactNode;
    protected renderLegendSection(): React.ReactNode;
}
//# sourceMappingURL=ConfigurationPanelContent.d.ts.map