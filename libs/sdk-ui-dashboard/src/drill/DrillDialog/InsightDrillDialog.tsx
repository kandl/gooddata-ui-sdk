// (C) 2020 GoodData Corporation
import React from "react";
import { IInsightWidget } from "@gooddata/sdk-backend-spi";
import { insightTitle } from "@gooddata/sdk-model";
import stableStringify from "json-stable-stringify";
import { DrillStep, OnDashboardDrill } from "../interfaces";
import { DrillDialog } from "./DrillDialog";
import { useDashboardSelector } from "../../model/state/dashboardStore";
import { selectWidgetByRef } from "../../model/state/layout/layoutSelectors";
import { FullScreenOverlay, Overlay, OverlayPositionType, useMediaQuery } from "@gooddata/sdk-ui-kit";
import { getDrillDownAttributeTitle } from "../utils/drillDownUtils";
import { DefaultDashboardInsight } from "../../insight/DefaultDashboardInsight";

export interface InsightDrillDialogProps {
    drillSteps: DrillStep[];
    activeDrillStep: DrillStep;
    onDrillSelect?: (drillStep: DrillStep) => void;
    onDrill?: OnDashboardDrill;
    onClose: () => void;
    onBackButtonClick: () => void;
}

export const InsightDrillDialog = (props: InsightDrillDialogProps) => {
    const { onDrillSelect, drillSteps, activeDrillStep, onDrill, onClose, onBackButtonClick } = props;

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
                        <DefaultDashboardInsight
                            key={stableStringify(activeDrillStep.insight)}
                            insight={activeDrillStep.insight!}
                            insightWidget={widget}
                            disableWidgetImplicitDrills
                            onDrillSelect={onDrillSelect}
                            onDrill={onDrill}
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
