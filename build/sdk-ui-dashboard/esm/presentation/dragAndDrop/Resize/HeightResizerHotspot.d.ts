/// <reference types="react" />
import { ISettings, ScreenSize, IInsight } from "@gooddata/sdk-model";
import { IDashboardLayoutItemFacade, IDashboardLayoutSectionFacade } from "../../../_staging/dashboard/fluidLayout/facade/interfaces.js";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap.js";
export type HeightResizerHotspotProps = {
    section: IDashboardLayoutSectionFacade<unknown>;
    items: IDashboardLayoutItemFacade<unknown>[];
    screen: ScreenSize;
    getLayoutDimensions: () => DOMRect;
};
export declare function HeightResizerHotspot({ section, items, screen, getLayoutDimensions, }: HeightResizerHotspotProps): JSX.Element;
export declare function getHeightsGR(items: IDashboardLayoutItemFacade<unknown>[], insightMap: ObjRefMap<IInsight>, screen: ScreenSize, settings: ISettings): number[];
export declare function getNewHeightGR(widgetHeights: number[], offsetYPX: number, scrollCorrectionY: number, minLimit: number, maxLimit: number): number;
