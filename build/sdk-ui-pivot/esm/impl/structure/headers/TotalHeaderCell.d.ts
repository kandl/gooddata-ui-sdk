import React from "react";
export type AlignPositions = "left" | "right" | "center";
export declare const ALIGN_LEFT = "left";
export interface IHeaderCellProps {
    displayText: string;
    className?: string;
    textAlign?: AlignPositions;
}
export default class TotalHeaderCell extends React.Component<IHeaderCellProps> {
    static defaultProps: Pick<IHeaderCellProps, "textAlign">;
    render(): JSX.Element;
    private renderText;
}
//# sourceMappingURL=TotalHeaderCell.d.ts.map