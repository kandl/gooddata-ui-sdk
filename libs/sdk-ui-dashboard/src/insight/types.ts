// (C) 2020-2021 GoodData Corporation
import React from "react";
import {
    FilterContextItem,
    IAnalyticalBackend,
    IDrillToAttributeUrl,
    IDrillToDashboard,
    IDrillToInsight,
    IDrillToCustomUrl,
    IInsightWidget,
} from "@gooddata/sdk-backend-spi";
import { IFilter, IInsight } from "@gooddata/sdk-model";
import { IDrillableItem, IErrorProps, IHeaderPredicate, ILoadingProps, OnError } from "@gooddata/sdk-ui";
import { OnDashboardDrill } from "../drill/interfaces";
import { IDashboardDrillEvent, IDrillDownDefinition } from "@gooddata/sdk-ui-ext";

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

    onDrillDown?: (context: {
        drillDefinition: IDrillDownDefinition;
        drillEvent: IDashboardDrillEvent;
        insight: IInsight;
    }) => void;
    //
    onDrillToInsight?: (context: {
        drillDefinition: IDrillToInsight;
        drillEvent: IDashboardDrillEvent;
        insight: IInsight;
    }) => void;
    //
    onDrillToDashboard?: (context: {
        drillDefinition: IDrillToDashboard;
        drillEvent: IDashboardDrillEvent;
        filters: IFilter[];
    }) => void;
    //
    onDrillToAttributeUrl?: (context: {
        drillDefinition: IDrillToAttributeUrl;
        drillEvent: IDashboardDrillEvent;
        url: string;
    }) => void;
    //
    onDrillToCustomUrl?: (context: {
        drillDefinition: IDrillToCustomUrl;
        drillEvent: IDashboardDrillEvent;
        url: string;
    }) => void;

    disableWidgetImplicitDrills?: boolean;
    onError?: OnError;
    ErrorComponent?: React.ComponentType<IErrorProps>;
    LoadingComponent?: React.ComponentType<ILoadingProps>;
    clientHeight?: number;
}
