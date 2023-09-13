/// <reference types="react" />
import { ScreenSize } from "@gooddata/sdk-model";
import { IDashboardLayoutItemFacade } from "../../../_staging/dashboard/fluidLayout/facade/interfaces.js";
export type WidthResizerHotspotProps = {
    item: IDashboardLayoutItemFacade<unknown>;
    screen: ScreenSize;
    getGridColumnHeightInPx: () => number;
    getGridColumnWidth: () => number;
    getLayoutDimensions: () => DOMRect;
};
export declare function WidthResizerHotspot({ item, screen, getGridColumnWidth, getGridColumnHeightInPx, getLayoutDimensions, }: WidthResizerHotspotProps): JSX.Element | null;
