import React from "react";
import { IGeoChartInnerProps } from "./GeoChartInner.js";
import { IColorStrategy, IPushpinCategoryLegendItem } from "@gooddata/sdk-ui-vis-commons";
export declare class GeoChartOptionsWrapper extends React.Component<IGeoChartInnerProps> {
    private readonly emptyHeaderString;
    private readonly nullHeaderString;
    private readonly errorMap;
    constructor(props: IGeoChartInnerProps);
    render(): string | number | boolean | React.ReactFragment | JSX.Element | null | undefined;
    renderVisualization(): React.ReactNode;
    private buildGeoChartOptions;
    private getCategoryLegendItems;
    private validateData;
}
export declare function createCategoryLegendItems(colorStrategy: IColorStrategy, emptyHeaderString: string, nullHeaderString: string): IPushpinCategoryLegendItem[];
//# sourceMappingURL=GeoChartOptionsWrapper.d.ts.map