import { ILayoutCoordinates } from "../../../types.js";
/**
 * @internal
 */
export declare function useWidgetDragHoverHandlers(): {
    handleDragHoverStart: (coordinations: ILayoutCoordinates) => void;
    handleDragHoverEnd: () => void;
};
