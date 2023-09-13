/// <reference types="react" />
import { VisType } from "@gooddata/sdk-ui";
export declare function calculateGeoPushpinWidgetHeight(windowHeight: number, visualizationItemWidth: number): React.CSSProperties;
export declare function isGeoPushpin(visType: VisType): boolean;
export declare function isFullWidthGeoPushpin(currentColumnWidth: number, visType: VisType): boolean;
export declare function getGeoPushpinWidgetStyle(visType: VisType, visualizationItemWidth: number, currentColumnWidth: number, windowHeight: number, enableCustomHeight: boolean): React.CSSProperties | null;
