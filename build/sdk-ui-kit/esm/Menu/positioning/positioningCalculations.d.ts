import { MenuAlignment } from "../MenuSharedTypes.js";
export interface IDimensions {
    width: number;
    height: number;
}
export interface ICoordinates {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
export interface IDimensionsAndCoordinates extends IDimensions, ICoordinates {
}
export type Dimension = "width" | "height";
export type Direction = "left" | "right" | "top" | "bottom";
export interface IMenuPosition {
    left: number;
    top: number;
}
export declare function getViewportDimensionsAndCoords(): IDimensionsAndCoordinates;
export declare function getElementDimensionsAndCoords(element: HTMLElement): IDimensionsAndCoordinates;
export declare function getElementDimensions(element: Element): IDimensions;
export interface IMenuPositionConfig {
    toggler: IDimensionsAndCoordinates;
    viewport: IDimensionsAndCoordinates;
    menu: IDimensions;
    alignment: MenuAlignment;
    spacing: number;
    offset: number;
    topLevelMenu: boolean;
}
export declare function calculateMenuPosition({ toggler, viewport, menu, alignment, spacing, offset, topLevelMenu, }: IMenuPositionConfig): IMenuPosition;
//# sourceMappingURL=positioningCalculations.d.ts.map