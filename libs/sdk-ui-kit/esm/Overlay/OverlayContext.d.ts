import React from "react";
import { OverlayController } from "./OverlayController.js";
/**
 * @internal
 */
export declare const OverlayContext: React.Context<OverlayController>;
/**
 * Properties for {@link OverlayControllerProvider} component.
 *
 * @internal
 */
export interface IOverlayControllerProviderProps {
    /**
     * Overlay controller singleton class for z-index handling.
     */
    overlayController: OverlayController;
    /**
     * React children
     */
    children?: React.ReactNode;
}
/**
 * Component for injecting {@link OverlayController} into all components in the application.
 *
 * @internal
 */
export declare const OverlayControllerProvider: React.FC<IOverlayControllerProviderProps>;
/**
 * Hook to get current instance of the {@link OverlayController}
 *
 * @returns an instance of the {@link OverlayController}
 *
 * @internal
 */
export declare const useOverlayController: () => OverlayController;
/**
 * Hook to get the css `z-index` property for given overlay.
 *
 * @param uuid - uuid of the overlay.
 *
 * @returns - `z-index` for given overlay.
 *
 * @internal
 */
export declare const useOverlayZIndex: (uuid: string) => number;
//# sourceMappingURL=OverlayContext.d.ts.map