import React, { Component } from "react";
/**
 * @internal
 */
export type SingleSelectListItemType = "header" | "separator";
/**
 * @internal
 */
export interface ISingleSelectListItemProps {
    title?: string;
    icon?: string;
    type?: SingleSelectListItemType;
    className?: string;
    info?: string;
    isSelected?: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseOver?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseOut?: (e: React.MouseEvent<HTMLElement>) => void;
}
/**
 * @internal
 */
export interface ISingleSelectListItemState {
    isOverflowed: boolean;
}
/**
 * @internal
 */
export declare class SingleSelectListItem extends Component<ISingleSelectListItemProps, ISingleSelectListItemState> {
    private titleRef;
    constructor(props: ISingleSelectListItemProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    private checkOverflow;
    private getClassNames;
    render(): JSX.Element;
    private renderTitle;
    private renderIcon;
    private renderSeparatorItem;
    private renderHeaderItem;
    private renderInfo;
}
//# sourceMappingURL=ListItem.d.ts.map