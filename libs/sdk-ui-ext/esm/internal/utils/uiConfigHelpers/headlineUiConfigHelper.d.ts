import { IntlShape } from "react-intl";
import { IInsightDefinition, ISettings } from "@gooddata/sdk-model";
import { IChartConfig } from "@gooddata/sdk-ui-charts";
import { IReferencePoint, IUiConfig, IVisProps, IVisualizationProperties } from "../../interfaces/Visualization.js";
import { HeadlineControlProperties } from "../../interfaces/ControlProperties.js";
export declare function getDefaultHeadlineUiConfig(settings?: ISettings): IUiConfig;
export declare function getHeadlineUiConfig(referencePoint: IReferencePoint, intl: IntlShape, settings?: ISettings): IUiConfig;
export declare function buildHeadlineVisualizationConfig(visualizationProperties: IVisualizationProperties, settings: ISettings, options: IVisProps): IChartConfig;
export declare function getHeadlineSupportedProperties(visualizationProperties: IVisualizationProperties): IVisualizationProperties<HeadlineControlProperties>;
export declare function isComparisonEnabled(insight: IInsightDefinition): boolean;
export declare function getComparisonDefaultCalculationType(insight: IInsightDefinition): import("@gooddata/sdk-ui-charts").CalculationType;
//# sourceMappingURL=headlineUiConfigHelper.d.ts.map