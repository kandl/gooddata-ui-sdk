// (C) 2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import { IFilter, IInsight, areObjRefsEqual } from "@gooddata/sdk-model";
import { isWidget } from "@gooddata/sdk-backend-spi";
import {
    IDrillableItem,
    IErrorProps,
    IHeaderPredicate,
    ILoadingProps,
    OnError,
    OnFiredDrillEvent,
} from "@gooddata/sdk-ui";
import { KpiView } from "./KpiView";
import { InsightRenderer } from "./InsightRenderer";
import {
    IWidgetAlert,
    IAnalyticalBackend,
    IFilterContext,
    ITempFilterContext,
    IDashboardLayoutContent,
} from "@gooddata/sdk-backend-spi";
import {
    DashboardViewLayoutWidgetClass,
    getDashboardLayoutContentHeightForRatioAndScreen,
    getDashboardLayoutMinimumWidgetHeight,
} from "../DashboardLayout";
import { DashboardItemKpi } from "../DashboardItem/DashboardItemKpi";
import { DashboardItemHeadline } from "../DashboardItem/DashboardItemHeadline";
import { DashboardItemVisualization } from "../DashboardItem/DashboardItemVisualization";
import { DashboardItem } from "../DashboardItem/DashboardItem";
import { getVisTypeCssClass } from "./utils";
import { IDashboardViewLayoutContentRenderProps } from "../DashboardLayout/interfaces/dashboardLayoutComponents";

export type IDashboardContentRendererProps = IDashboardViewLayoutContentRenderProps<
    IDashboardLayoutContent
> & {
    alerts: IWidgetAlert[];
    backend?: IAnalyticalBackend;
    workspace?: string;
    filters?: IFilter[];
    filterContext: IFilterContext | ITempFilterContext;
    drillableItems?: Array<IDrillableItem | IHeaderPredicate>;
    onDrill?: OnFiredDrillEvent;
    ErrorComponent: React.ComponentType<IErrorProps>;
    LoadingComponent: React.ComponentType<ILoadingProps>;
    onError?: OnError;
    widgetClass?: DashboardViewLayoutWidgetClass;
    insight?: IInsight;
};

export const DashboardContentRenderer: React.FC<IDashboardContentRendererProps> = (props) => {
    const {
        column,
        screen,
        className,
        debug,
        contentRef,
        DefaultRenderer,
        isResizedByLayoutSizingStrategy,
        widgetClass,
    } = props;

    let minHeight = 0;
    const content = column.content();
    const currentSize = column.size()[screen];

    if (isWidget(content)) {
        minHeight = getDashboardLayoutMinimumWidgetHeight(widgetClass);
    }

    const height = currentSize && getDashboardLayoutContentHeightForRatioAndScreen(currentSize, screen);

    return (
        <DefaultRenderer
            DefaultRenderer={DefaultRenderer}
            column={column}
            screen={screen}
            className={className}
            contentRef={contentRef}
            debug={debug}
            height={height}
            minHeight={minHeight}
            isResizedByLayoutSizingStrategy={isResizedByLayoutSizingStrategy}
        >
            <DashboardWidgetRenderer {...props} />
        </DefaultRenderer>
    );
};

export const DashboardWidgetRenderer: React.FC<IDashboardContentRendererProps> = (props) => {
    const {
        column,
        ErrorComponent,
        LoadingComponent,
        alerts,
        backend,
        drillableItems,
        filters,
        filterContext,
        onDrill,
        onError,
        workspace,
        screen,
        widgetClass,
        insight,
    } = props;

    const content = column.content();

    if (isWidget(content)) {
        if (content.type === "insight") {
            return (
                <DashboardItem
                    className={cx(
                        "type-visualization",
                        "gd-dashboard-view-widget",
                        getVisTypeCssClass(widgetClass),
                    )}
                    screen={screen}
                >
                    <DashboardItemVisualization
                        renderHeadline={() => <DashboardItemHeadline title={content.title} />}
                    >
                        {() => (
                            <InsightRenderer
                                insight={insight}
                                insightWidget={content}
                                backend={backend}
                                workspace={workspace}
                                filters={filters}
                                filterContext={filterContext}
                                drillableItems={drillableItems}
                                onDrill={onDrill}
                                onError={onError}
                                ErrorComponent={ErrorComponent}
                                LoadingComponent={LoadingComponent}
                            />
                        )}
                    </DashboardItemVisualization>
                </DashboardItem>
            );
        }

        const relevantAlert = alerts?.find((alert) => areObjRefsEqual(alert.widget, content.ref));

        return (
            <DashboardItem className="type-kpi" screen={screen}>
                <DashboardItemKpi renderHeadline={() => <DashboardItemHeadline title={content.title} />}>
                    {({ clientWidth }) => (
                        <KpiView
                            kpiWidget={content}
                            filterContext={filterContext}
                            alert={relevantAlert}
                            backend={backend}
                            workspace={workspace}
                            filters={filters}
                            drillableItems={drillableItems}
                            onDrill={onDrill}
                            onError={onError}
                            ErrorComponent={ErrorComponent}
                            LoadingComponent={LoadingComponent}
                            clientWidth={clientWidth}
                        />
                    )}
                </DashboardItemKpi>
            </DashboardItem>
        );
    }

    return <div>Unknown widget</div>;
};
