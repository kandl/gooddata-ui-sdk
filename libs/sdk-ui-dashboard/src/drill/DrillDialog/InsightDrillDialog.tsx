// (C) 2020 GoodData Corporation
import React from "react";
import {
    IDrillToAttributeUrl,
    IDrillToCustomUrl,
    IDrillToDashboard,
    IDrillToInsight,
    IInsightWidget,
} from "@gooddata/sdk-backend-spi";
import { IFilter, IInsight, insightTitle } from "@gooddata/sdk-model";
import stableStringify from "json-stable-stringify";
import { DrillStep, OnDashboardDrill } from "../interfaces";
import { DrillDialog } from "./DrillDialog";
import { useDashboardSelector } from "../../model/state/dashboardStore";
import { selectWidgetByRef } from "../../model/state/layout/layoutSelectors";
import { FullScreenOverlay, Overlay, OverlayPositionType, useMediaQuery } from "@gooddata/sdk-ui-kit";
import { getDrillDownAttributeTitle } from "../utils/drillDownUtils";
import { DefaultDashboardInsightWithDrillSelect } from "../../insight/DefaultDashboardInsightWithDrillSelect";
import { IDashboardDrillEvent, IDrillDownDefinition } from "@gooddata/sdk-ui-ext";

export interface InsightDrillDialogProps {
    drillSteps: DrillStep[];
    activeDrillStep: DrillStep;
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

    onClose: () => void;
    onBackButtonClick: () => void;
}

export const InsightDrillDialog = (props: InsightDrillDialogProps) => {
    const {
        drillSteps,
        activeDrillStep,
        onDrill,
        onClose,
        onBackButtonClick,
        onDrillDown,
        onDrillToAttributeUrl,
        onDrillToCustomUrl,
        onDrillToDashboard,
        onDrillToInsight,
    } = props;

    const breadcrumbs = drillSteps.map((d) =>
        getDrillDownAttributeTitle(d.drillDefinition as any, d.drillEvent),
    );

    const isMobileDevice = useMediaQuery("mobileDevice");

    const widget = useDashboardSelector(
        selectWidgetByRef(activeDrillStep!.drillEvent.widgetRef!),
    ) as IInsightWidget;

    const modalTitle = insightTitle(activeDrillStep!.insight!);

    const positionType: OverlayPositionType = "fixed";
    const overlayProps = {
        className: "gd-drill-modal-overlay",
        isModal: true,
        closeOnOutsideClick: true,
        closeOnEscape: true,
        ignoreClicksOnByClass: [".s-sort-direction-arrow"],
        onClose,
        positionType,
    };

    const OverlayComponent = isMobileDevice ? FullScreenOverlay : Overlay;

    switch (activeDrillStep.drillDefinition.type) {
        case "drillDown":
        case "drillToInsight": {
            return (
                <OverlayComponent {...overlayProps}>
                    <DrillDialog
                        title={modalTitle}
                        isBackButtonVisible={drillSteps.length > 1}
                        onBackButtonClick={onBackButtonClick}
                        onCloseDialog={onClose}
                        breadcrumbs={breadcrumbs}
                    >
                        <DefaultDashboardInsightWithDrillSelect
                            key={stableStringify(activeDrillStep.insight)}
                            insight={activeDrillStep.insight!}
                            insightWidget={widget}
                            disableWidgetImplicitDrills
                            onDrill={onDrill}
                            onDrillDown={onDrillDown}
                            onDrillToAttributeUrl={onDrillToAttributeUrl}
                            onDrillToCustomUrl={onDrillToCustomUrl}
                            onDrillToDashboard={onDrillToDashboard}
                            onDrillToInsight={onDrillToInsight}
                        />
                    </DrillDialog>
                </OverlayComponent>
            );
        }
        case "drillToCustomUrl":
        case "drillToAttributeUrl":
        case "drillToDashboard":
        case "drillToLegacyDashboard":
        default: {
            return null;
        }
    }
};
