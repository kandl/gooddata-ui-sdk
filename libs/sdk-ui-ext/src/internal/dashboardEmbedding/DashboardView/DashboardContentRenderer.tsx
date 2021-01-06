// (C) 2020 GoodData Corporation
import React from "react";
import { isWidget, UnexpectedError } from "@gooddata/sdk-backend-spi";
import {
    getDashboardLayoutContentHeightForRatioAndScreen,
    getDashboardLayoutMinimumWidgetHeight,
} from "../DashboardLayout";
import { DashboardWidgetRenderer } from "./DashboardWidgetRenderer";
import { IDashboardContentRenderProps } from "./types";

export const DashboardContentRenderer: React.FC<IDashboardContentRenderProps> = (props) => {
    const {
        column,
        screen,
        className,
        debug,
        contentRef,
        DefaultRenderer,
        isResizedByLayoutSizingStrategy,
        widgetClass,
        widgetRenderer: WidgetRenderer,
        ErrorComponent,
        LoadingComponent,
        alerts,
        filterContext,
        backend,
        drillableItems,
        filters,
        insight,
        onDrill,
        onError,
        workspace,
    } = props;

    const content = column.content();

    if (!isWidget(content)) {
        throw new UnexpectedError("Custom dashboard view content is not yet supported.");
    }

    const currentSize = column.size()[screen];
    const minHeight = getDashboardLayoutMinimumWidgetHeight(widgetClass);
    const height = currentSize && getDashboardLayoutContentHeightForRatioAndScreen(currentSize, screen);

    return WidgetRenderer ? (
        <WidgetRenderer
            column={column}
            ErrorComponent={ErrorComponent}
            LoadingComponent={LoadingComponent}
            alerts={alerts}
            filterContext={filterContext}
            screen={screen}
            widget={content}
            backend={backend}
            drillableItems={drillableItems}
            filters={filters}
            insight={insight}
            onDrill={onDrill}
            onError={onError}
            widgetClass={widgetClass}
            workspace={workspace}
            DefaultRenderer={WidgetRenderer}
            minHeight={minHeight}
            height={height}
        />
    ) : (
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
            <DashboardWidgetRenderer {...props} DefaultRenderer={DashboardWidgetRenderer} widget={content} />
        </DefaultRenderer>
    );
};
