import React from "react";
import { HeadlineElementType } from "@gooddata/sdk-ui";
import { IChartConfig } from "../../../interfaces/index.js";
import { IHeadlineData } from "../Headlines.js";
import { Identifier } from "@gooddata/sdk-model";
export interface IHeadlineFiredDrillEventItemContext {
    localIdentifier: Identifier;
    value: string | null;
    element: HeadlineElementType;
}
export type IHeadlineFiredDrillEvent = (itemContext?: IHeadlineFiredDrillEventItemContext, elementTarget?: EventTarget) => void;
export interface IHeadlineVisualizationProps {
    data: IHeadlineData;
    config?: IChartConfig;
    onDrill?: IHeadlineFiredDrillEvent;
    onAfterRender?: () => void;
    disableDrillUnderline?: boolean;
}
/**
 * The React component that renders the Headline visualisation.
 */
export default class Headline extends React.Component<IHeadlineVisualizationProps> {
    static defaultProps: Pick<IHeadlineVisualizationProps, "onDrill" | "onAfterRender" | "config" | "disableDrillUnderline">;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private secondaryItemTitleWrapperRef;
    render(): JSX.Element;
    private getDrillableClasses;
    private getPrimaryItemClasses;
    private getSecondaryItemClasses;
    private getValueWrapperClasses;
    private fireDrillEvent;
    private handleClickOnPrimaryItem;
    private handleClickOnSecondaryItem;
    private renderTertiaryItem;
    private renderSecondaryItem;
    private renderCompareItems;
    private renderHeadlineItem;
    private renderHeadlineItemAsValue;
    private renderHeadlineItemAsLink;
    private renderPrimaryItem;
    private getCompareSectionClasses;
    private isShortenedLabel;
}
//# sourceMappingURL=Headline.d.ts.map