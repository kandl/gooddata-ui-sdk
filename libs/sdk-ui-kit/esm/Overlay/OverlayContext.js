// (C) 2022 GoodData Corporation
import React, { createContext, useContext } from "react";
/**
 * @internal
 */
export const OverlayContext = createContext(undefined);
OverlayContext.displayName = "OverlayContext";
/**
 * Component for injecting {@link OverlayController} into all components in the application.
 *
 * @internal
 */
export const OverlayControllerProvider = ({ children, overlayController, }) => {
    return React.createElement(OverlayContext.Provider, { value: overlayController }, children);
};
/**
 * Hook to get current instance of the {@link OverlayController}
 *
 * @returns an instance of the {@link OverlayController}
 *
 * @internal
 */
export const useOverlayController = () => {
    return useContext(OverlayContext);
};
/**
 * Hook to get the css `z-index` property for given overlay.
 *
 * @param uuid - uuid of the overlay.
 *
 * @returns - `z-index` for given overlay.
 *
 * @internal
 */
export const useOverlayZIndex = (uuid) => {
    const overlayController = useContext(OverlayContext);
    return overlayController.getZIndex(uuid);
};
//# sourceMappingURL=OverlayContext.js.map