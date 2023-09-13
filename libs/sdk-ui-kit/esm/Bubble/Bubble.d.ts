import React from "react";
import { IAlignPoint } from "../typings/positioning.js";
import { ArrowDirections, ArrowOffsets } from "./typings.js";
export declare const X_SHIFT = 7;
export declare const Y_SHIFT = 11;
/**
 * @internal
 */
export interface IBubbleProps {
    alignPoints?: IAlignPoint[];
    alignTo?: string;
    arrowOffsets?: ArrowOffsets;
    arrowDirections?: ArrowDirections;
    arrowStyle?: React.CSSProperties;
    className?: string;
    closeOnOutsideClick?: boolean;
    closeOnParentScroll?: boolean;
    /**
     * Array of refs where user clicks should be ignored
     * and bubble should not be closed by clicking on them
     */
    ignoreClicksOn?: any[];
    ignoreClicksOnByClass?: string[];
    onClose?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onKeyDown?: () => void;
    overlayClassName?: string;
    children?: React.ReactNode;
}
/**
 * @internal
 */
export interface IBubbleState {
    alignPoints: IAlignPoint[];
    optimalAlignPoints: string;
}
/**
 * @internal
 */
export declare class Bubble extends React.Component<IBubbleProps, IBubbleState> {
    static defaultProps: {
        alignPoints: {
            align: string;
        }[];
        alignTo: string;
        arrowOffsets: {};
        arrowDirections: {};
        arrowStyle: {};
        className: string;
        closeOnOutsideClick: boolean;
        closeOnParentScroll: boolean;
        onClose: (...args: any[]) => void;
        onMouseEnter: (...args: any[]) => void;
        onMouseLeave: (...args: any[]) => void;
        overlayClassName: string;
    };
    static identifier: string;
    arrowOffsets: ArrowOffsets;
    arrowDirections: ArrowDirections;
    constructor(props: IBubbleProps);
    shouldComponentUpdate(nextProps: IBubbleProps, nextState: IBubbleState): boolean;
    onAlign: (alignment: IAlignPoint) => void;
    getClassnames(): string;
    getArrowsClassname(alignPoints: string): string;
    getArrowDirection(alignPoints: string): string;
    addOffsetToAlignPoints(alignPoints: IAlignPoint[]): IAlignPoint[];
    render(): JSX.Element;
}
//# sourceMappingURL=Bubble.d.ts.map