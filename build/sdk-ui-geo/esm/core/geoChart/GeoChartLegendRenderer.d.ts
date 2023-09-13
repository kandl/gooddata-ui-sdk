/// <reference types="react" />
import { ContentRect } from "react-measure";
import { IGeoData } from "../../GeoChart.js";
import { IPushpinCategoryLegendItem, PositionType } from "@gooddata/sdk-ui-vis-commons";
/**
 * @internal
 */
export interface IGeoChartLegendRendererProps {
    categoryItems?: IPushpinCategoryLegendItem[];
    format?: string;
    geoData?: IGeoData;
    height?: number;
    locale?: string;
    colorLegendValue: string;
    position?: PositionType;
    responsive?: boolean | "autoPositionWithPopup";
    isFluidLegend?: boolean;
    numericSymbols?: string[];
    onItemClick?: (item: IPushpinCategoryLegendItem) => void;
    contentRect?: ContentRect;
    maxRows?: number;
    name?: string;
    renderPopUp?: boolean;
    containerId?: string;
}
export default function GeoChartLegendRenderer(props: IGeoChartLegendRendererProps): JSX.Element | null;
//# sourceMappingURL=GeoChartLegendRenderer.d.ts.map