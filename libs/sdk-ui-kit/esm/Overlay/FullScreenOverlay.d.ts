import { Overlay } from "./Overlay.js";
import { IOverlayProps, IOverlayState } from "./typings.js";
/**
 * @internal
 */
export declare class FullScreenOverlay extends Overlay<IOverlayState> {
    constructor(props: IOverlayProps<any>);
    UNSAFE_componentWillMount(): void;
    componentWillUnmount(): void;
    protected getOverlayStyles: () => React.CSSProperties;
}
//# sourceMappingURL=FullScreenOverlay.d.ts.map