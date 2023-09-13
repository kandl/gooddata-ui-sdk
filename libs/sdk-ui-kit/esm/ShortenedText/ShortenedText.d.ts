import React, { PureComponent } from "react";
import { IAlignPoint } from "../typings/positioning.js";
export declare function getShortenedTitle(title: string, element: Pick<HTMLElement, "scrollWidth" | "getBoundingClientRect">): string;
/**
 * @internal
 */
export interface IShortenedTextProps {
    children: string;
    className?: string;
    tagName?: React.ElementType;
    tooltipAlignPoints?: IAlignPoint[];
    tooltipVisibleOnMouseOver?: boolean;
    getElement?: (context: any) => Pick<HTMLElement, "scrollWidth" | "getBoundingClientRect">;
    displayTooltip?: boolean;
}
/**
 * @internal
 */
export interface IShortenedTextState {
    title: string;
    customTitle: boolean;
}
/**
 * To make this component work, parent container needs this:
 *      max-width: Xpx;
 *      white-space: nowrap;
 *
 * and the component itself needs:
 *      display: inline-block;
 *      width: 100%;
 *      white-space: nowrap;
 */
/**
 * @internal
 */
export declare class ShortenedText extends PureComponent<IShortenedTextProps, IShortenedTextState> {
    static defaultProps: Pick<IShortenedTextProps, "className" | "tagName" | "tooltipAlignPoints" | "tooltipVisibleOnMouseOver" | "getElement" | "displayTooltip">;
    textRef: React.RefObject<HTMLElement>;
    constructor(props: IShortenedTextProps);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IShortenedTextProps): void;
    componentDidUpdate(): void;
    checkTitle(): void;
    recomputeShortening(): void;
    renderTextWithBubble(): React.ReactNode;
    renderText(): React.ReactNode;
    render(): React.ReactNode;
}
//# sourceMappingURL=ShortenedText.d.ts.map