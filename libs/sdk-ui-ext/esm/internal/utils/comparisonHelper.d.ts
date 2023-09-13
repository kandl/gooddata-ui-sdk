import { IntlShape } from "react-intl";
import { CalculationType, IColorConfig, ICalculationDefaultValue } from "@gooddata/sdk-ui-charts";
import { IFormatPreset, IFormatTemplate } from "@gooddata/sdk-ui-kit";
import { IVisualizationProperties } from "../interfaces/Visualization.js";
import { HeadlineControlProperties, IComparisonControlProperties } from "../interfaces/ControlProperties.js";
export declare function getComparisonDefaultValues(defaultCalculationType: CalculationType, properties: IVisualizationProperties<HeadlineControlProperties>): ICalculationDefaultValue;
export declare function getNumberFormat(properties: IVisualizationProperties<IComparisonControlProperties>, defaultFormat: string): string;
export declare function isComparisonDefaultColors(colorConfig: IColorConfig): boolean;
export declare const getPresets: (intl: IntlShape) => ReadonlyArray<IFormatPreset>;
/**
 * @internal
 */
export declare const getTemplates: (intl: IntlShape) => ReadonlyArray<IFormatTemplate>;
//# sourceMappingURL=comparisonHelper.d.ts.map