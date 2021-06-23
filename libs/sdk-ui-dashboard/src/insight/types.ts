// (C) 2020-2021 GoodData Corporation
import React from "react";
import { FilterContextItem, IAnalyticalBackend, IInsightWidget } from "@gooddata/sdk-backend-spi";
import { IInsight } from "@gooddata/sdk-model";
import { IDrillableItem, IErrorProps, IHeaderPredicate, ILoadingProps, OnError } from "@gooddata/sdk-ui";
import { DrillStep, OnDashboardDrill } from "../drill/interfaces";

/**
 * @internal
 */
export interface DashboardInsightProps {
    insightWidget: IInsightWidget;
    insight: IInsight;
    backend?: IAnalyticalBackend;
    workspace?: string;
    filters?: FilterContextItem[];
    drillableItems?: Array<IDrillableItem | IHeaderPredicate>;
    onDrill?: OnDashboardDrill;
    onDrillSelect?: (drillStep: DrillStep) => void;
    disableWidgetImplicitDrills?: boolean;
    onError?: OnError;
    ErrorComponent?: React.ComponentType<IErrorProps>;
    LoadingComponent?: React.ComponentType<ILoadingProps>;
    clientHeight?: number;
}
