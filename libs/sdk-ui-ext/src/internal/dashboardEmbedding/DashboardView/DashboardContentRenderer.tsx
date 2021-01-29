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
        defaultRenderer,
        isResizedByLayoutSizingStrategy,
        widgetClass,
        widgetRenderer,
        insight,
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
    } = props;

    const content = column.content();

    if (!isWidget(content)) {
        throw new UnexpectedError("Custom dashboard view content is not yet supported.");
    }

    const currentSize = column.size()[screen];
    const minHeight = getDashboardLayoutMinimumWidgetHeight(widgetClass);
    const height = currentSize && getDashboardLayoutContentHeightForRatioAndScreen(currentSize, screen);

    return widgetRenderer
        ? widgetRenderer({
              column,
              ErrorComponent,
              LoadingComponent,
              alerts,
              filterContext,
              screen,
              widget: content,
              backend,
              drillableItems,
              filters,
              insight,
              onDrill,
              onError,
              widgetClass,
              workspace,
              defaultRenderer,
              minHeight,
              height,
          })
        : defaultRenderer({
              defaultRenderer: defaultRenderer,
              column: column,
              screen: screen,
              className: className,
              contentRef: contentRef,
              debug: debug,
              height: currentSize.heightAsRatio ? height : undefined,
              minHeight: !currentSize.heightAsRatio ? minHeight : undefined,
              allowOverflow: !!currentSize.heightAsRatio,
              isResizedByLayoutSizingStrategy: isResizedByLayoutSizingStrategy,
              children: <DashboardWidgetRenderer {...props} widget={content} />,
          });
};
