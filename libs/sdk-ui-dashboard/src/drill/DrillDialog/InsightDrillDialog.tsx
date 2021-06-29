// (C) 2020 GoodData Corporation
import React from "react";
import { IInsightWidget } from "@gooddata/sdk-backend-spi";
import { IInsight, insightTitle } from "@gooddata/sdk-model";
import stableStringify from "json-stable-stringify";
import {
    OnDashboardDrill,
    OnDrillDown,
    OnDrillToAttributeUrl,
    OnDrillToCustomUrl,
    OnDrillToDashboard,
    OnDrillToInsight,
} from "../interfaces";
import { DrillDialog } from "./DrillDialog";
import { FullScreenOverlay, Overlay, OverlayPositionType, useMediaQuery } from "@gooddata/sdk-ui-kit";
import { DefaultDashboardInsightWithDrillSelect } from "../../insight/DefaultDashboardInsightWithDrillSelect";

/**
 * @internal
 */
export interface InsightDrillDialogProps {
    breadcrumbs: string[];
    widget: IInsightWidget;
    insight: IInsight;
    onDrill?: OnDashboardDrill;
    onDrillDown?: OnDrillDown;
    onDrillToInsight?: OnDrillToInsight;
    onDrillToDashboard?: OnDrillToDashboard;
    onDrillToAttributeUrl?: OnDrillToAttributeUrl;
    onDrillToCustomUrl?: OnDrillToCustomUrl;
    onClose: () => void;
    onBackButtonClick: () => void;
}

export const InsightDrillDialog = (props: InsightDrillDialogProps): JSX.Element => {
    const {
        breadcrumbs,
        widget,
        insight,
        onDrill,
        onClose,
        onBackButtonClick,
        onDrillDown,
        onDrillToAttributeUrl,
        onDrillToCustomUrl,
        onDrillToDashboard,
        onDrillToInsight,
    } = props;

    const isMobileDevice = useMediaQuery("mobileDevice");

    const modalTitle = insightTitle(insight);

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
    return (
        <OverlayComponent {...overlayProps}>
            <DrillDialog
                title={modalTitle}
                isBackButtonVisible={breadcrumbs.length > 1}
                onBackButtonClick={onBackButtonClick}
                onCloseDialog={onClose}
                breadcrumbs={breadcrumbs}
            >
                <DefaultDashboardInsightWithDrillSelect
                    key={stableStringify(insight)}
                    insight={insight}
                    widget={widget}
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
};
