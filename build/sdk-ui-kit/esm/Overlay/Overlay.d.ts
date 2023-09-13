import React from "react";
import { IOverlayProps, IOverlayState } from "./typings.js";
import { OverlayContext } from "./OverlayContext.js";
export declare const POSITION_SAME_AS_TARGET = "sameAsTarget";
/**
 * @internal
 */
export declare class Overlay<T = HTMLElement> extends React.Component<IOverlayProps<T>, IOverlayState> {
    static defaultProps: Partial<IOverlayProps<any>>;
    private overlayRef;
    private containerRef;
    private resizeHandler;
    private portalNode;
    private isComponentMounted;
    private clickedInside;
    private id;
    private alignmentTimeoutId;
    static contextType: React.Context<import("./OverlayController.js").OverlayController>;
    context: React.ContextType<typeof OverlayContext>;
    constructor(props: IOverlayProps<T>);
    UNSAFE_componentWillMount(): void;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IOverlayProps<T>): void;
    shouldComponentUpdate(nextProps: IOverlayProps<T>, nextState: IOverlayState): boolean;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    align: () => void;
    private clearAlignmentTimeout;
    private alignWithTimeout;
    private onMaskClick;
    protected getZIndex(): number | undefined;
    protected getOverlayStyles: () => React.CSSProperties;
    private getOverlayClasses;
    /**
     * Add CSS classes to overlay wrapper, so they can be used
     * for position of arrows and stuff
     */
    private getAlignClasses;
    private createPortalNode;
    private removePortalNodeAfterAllTreeUnmount;
    private isSameAsTargetPosition;
    private isEventOnParent;
    private shouldCloseOnClick;
    private hasClickedOnIgnoredNode;
    private isAligned;
    private isElementInChildOverlay;
    onDocumentMouseDown(e: React.MouseEvent): void;
    closeOnParentScroll(e: React.MouseEvent): void;
    closeOnMouseDrag: () => void;
    closeOnOutsideClick(e: Event): void;
    closeOnEscape(e: React.KeyboardEvent): void;
    private updateListeners;
    private addListeners;
    private removeListeners;
    private renderMask;
}
//# sourceMappingURL=Overlay.d.ts.map