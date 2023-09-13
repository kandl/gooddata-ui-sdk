import React, { Component } from "react";
import { WrappedComponentProps } from "react-intl";
/**
 * @internal
 */
export interface IInsightListItemProps {
    isLoading?: boolean;
    isLocked?: boolean;
    isSelected?: boolean;
    title?: string;
    description?: string;
    updated?: string;
    type?: string;
    width?: number;
    onClick?: () => void;
    onDelete?: () => void;
    onDescriptionPanelOpen?: () => void;
    showDescriptionPanel?: boolean;
    metadataTimeZone?: string;
}
/**
 * @internal
 */
export declare class InsightListItemCore extends Component<IInsightListItemProps & WrappedComponentProps> {
    private shortenedTextRef;
    render(): JSX.Element;
    componentDidUpdate(prevProps: IInsightListItemProps & WrappedComponentProps): void;
    handleClickDelete: (e: React.MouseEvent) => void;
    private renderLock;
    private renderUpdatedDateTime;
    private shouldRenderActions;
    private renderActions;
}
/**
 * @internal
 */
export declare const InsightListItem: React.FC<import("react-intl").WithIntlProps<IInsightListItemProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IInsightListItemProps & WrappedComponentProps>;
};
//# sourceMappingURL=InsightListItem.d.ts.map