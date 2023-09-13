import React from "react";
import { IGeoConfig } from "../GeoChart.js";
/**
 * @alpha
 */
export declare const MapboxTokenContext: React.Context<{
    mapboxToken: string | undefined;
}>;
/**
 * @alpha
 */
export declare const MapboxTokenProvider: React.FC<{
    token: string;
    children?: React.ReactNode;
}>;
/**
 * @internal
 */
export declare function withMapboxToken<T extends {
    config?: IGeoConfig;
}>(InnerComponent: React.ComponentType<T>): React.ComponentType<T>;
/**
 * @internal
 */
export declare function enrichMapboxToken<T>(config?: T & {
    mapboxToken?: string;
}, mapboxToken?: string): (T & {
    mapboxToken?: string;
}) | undefined;
/**
 * @alpha
 */
export declare function useMapboxTokenStrict(mapboxToken?: string): string;
/**
 * @alpha
 */
export declare function useMapboxToken(mapboxToken?: string): string | undefined;
//# sourceMappingURL=MapboxTokenProvider.d.ts.map