import React from "react";
/**
 * @internal
 */
export interface IScrollablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
    scrollToVisible?: (element: HTMLElement, container: HTMLElement, bottomMargin: number) => void;
    tagName?: React.ElementType;
}
/**
 * @internal
 */
export declare const ScrollablePanel: React.ForwardRefExoticComponent<IScrollablePanelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScrollablePanel.d.ts.map