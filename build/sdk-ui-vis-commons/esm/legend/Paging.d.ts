import React from "react";
/**
 * @internal
 */
export type ButtonsOrientationType = "upDown" | "leftRight";
/**
 * @internal
 */
export interface IPagingProps {
    page: number;
    pagesCount: number;
    showNextPage(): void;
    showPrevPage(): void;
    buttonsOrientation?: ButtonsOrientationType;
}
export type PagingButtonType = "prev" | "next";
/**
 * @internal
 */
export declare const Paging: (props: IPagingProps) => React.ReactElement;
//# sourceMappingURL=Paging.d.ts.map