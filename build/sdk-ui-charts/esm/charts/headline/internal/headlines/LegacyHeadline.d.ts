import React from "react";
import { IChartConfig } from "../../../../interfaces/index.js";
import { IHeadlineData } from "../interfaces/Headlines.js";
import { HeadlineFiredDrillEvent } from "../interfaces/DrillEvents.js";
export interface IHeadlineVisualizationProps {
    data: IHeadlineData;
    config?: IChartConfig;
    onDrill?: HeadlineFiredDrillEvent;
    onAfterRender?: () => void;
    disableDrillUnderline?: boolean;
}
/**
 * The React component that renders the Headline visualisation.
 */
export default class LegacyHeadline extends React.Component<IHeadlineVisualizationProps> {
    static defaultProps: Pick<IHeadlineVisualizationProps, "onDrill" | "onAfterRender" | "config" | "disableDrillUnderline">;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private secondaryItemTitleWrapperRef;
    render(): JSX.Element;
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
}
//# sourceMappingURL=LegacyHeadline.d.ts.map