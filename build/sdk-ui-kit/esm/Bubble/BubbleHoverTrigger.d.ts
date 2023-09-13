import { BubbleTrigger, IBubbleTriggerProps } from "./BubbleTrigger.js";
export declare const SHOW_DELAY = 425;
export declare const HIDE_DELAY = 200;
/**
 * @internal
 */
export interface IBubbleHoverTriggerProps extends IBubbleTriggerProps {
    showDelay?: number;
    hideDelay?: number;
    hoverHideDelay?: number;
}
/**
 * @internal
 */
export declare class BubbleHoverTrigger extends BubbleTrigger<IBubbleHoverTriggerProps> {
    static defaultProps: IBubbleHoverTriggerProps;
    scheduleId: number;
    componentWillUnmount(): void;
    private cancelBubbleVisibilityChange;
    private scheduleBubbleVisibilityChange;
    protected eventListeners(): any;
}
//# sourceMappingURL=BubbleHoverTrigger.d.ts.map