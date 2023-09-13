import React from "react";
/**
 * @internal
 */
export interface IBubbleTriggerProps {
    className?: string;
    children?: React.ReactNode;
    eventsOnBubble?: boolean;
    tagName?: React.ElementType;
    onBubbleOpen?: () => void;
    onBubbleClose?: () => void;
}
/**
 * @internal
 */
export interface IBubbleTriggerState {
    bubbleId: string;
    isBubbleVisible: boolean;
}
/**
 * @internal
 */
export declare class BubbleTrigger<P extends IBubbleTriggerProps> extends React.PureComponent<P, IBubbleTriggerState> {
    static defaultProps: IBubbleTriggerProps;
    readonly state: Readonly<IBubbleTriggerState>;
    private onClose;
    protected eventListeners(): any;
    protected changeBubbleVisibility(active: boolean): void;
    render(): JSX.Element;
}
//# sourceMappingURL=BubbleTrigger.d.ts.map