// (C) 2020-2022 GoodData Corporation
import React, { useCallback, useState } from "react";
import { idRef, insightTitle } from "@gooddata/sdk-model";
import { FullScreenOverlay, Overlay, OverlayController, OverlayControllerProvider, useMediaQuery, } from "@gooddata/sdk-ui-kit";
import { DOWNLOADER_ID } from "../../../../../_staging/fileUtils/downloadFile.js";
import { useInsightExport } from "../../../common/index.js";
import { WithDrillSelect } from "../../../../drill/index.js";
import { IntlWrapper } from "../../../../localization/index.js";
import { DrillDialog } from "./DrillDialog.js";
import { DrillDialogInsight } from "./DrillDialogInsight.js";
import { useWidgetExecutionsHandler } from "../../../../../model/index.js";
import { getTitleWithBreadcrumbs } from "./getTitleWithBreadcrumbs.js";
import { useDashboardComponentsContext } from "../../../../dashboardContexts/index.js";
import { ThemedLoadingEqualizer } from "../../../../presentationComponents/index.js";
import { DASHBOARD_HEADER_OVERLAYS_Z_INDEX } from "../../../../constants/index.js";
// Header z-index start at  6000 so we need force all overlays z-indexes start at 6000 to be above header
const overlayController = OverlayController.getInstance(DASHBOARD_HEADER_OVERLAYS_Z_INDEX);
const overlayIgnoredClasses = [
    ".s-sort-direction-arrow",
    ".gd-export-dialog",
    ".options-menu-export-xlsx",
    ".options-menu-export-csv",
    `#${DOWNLOADER_ID}`,
];
const DRILL_MODAL_EXECUTION_PSEUDO_REF = idRef("@@GDC_DRILL_MODAL");
export const InsightDrillDialog = (props) => {
    const { widget, locale, breadcrumbs, insight, onClose, onBackButtonClick, onDrillDown } = props;
    const isMobileDevice = useMediaQuery("mobileDevice");
    const [isLoading, setIsLoading] = useState(false);
    const executionsHandler = useWidgetExecutionsHandler(DRILL_MODAL_EXECUTION_PSEUDO_REF);
    const { ErrorComponent, LoadingComponent } = useDashboardComponentsContext({
        /**
         * There is a need to use Loading spinner instead of "Running three dots" loader while drill is loading.
         * If no custom loading component is provided, LoadingComponent defaults to Loading spinner.
         */
        LoadingComponent: ThemedLoadingEqualizer,
    });
    const handleLoadingChanged = useCallback(({ isLoading }) => {
        setIsLoading(isLoading);
        executionsHandler.onLoadingChanged({ isLoading });
    }, []);
    const baseInsightTitle = insightTitle(insight);
    const { exportCSVEnabled, exportXLSXEnabled, onExportCSV, onExportXLSX } = useInsightExport({
        title: getTitleWithBreadcrumbs(baseInsightTitle, breadcrumbs),
        widgetRef: DRILL_MODAL_EXECUTION_PSEUDO_REF,
        insight,
    });
    const OverlayComponent = isMobileDevice ? FullScreenOverlay : Overlay;
    return (React.createElement(OverlayControllerProvider, { overlayController: overlayController },
        React.createElement(OverlayComponent, { className: "gd-drill-modal-overlay", isModal: true, closeOnEscape: true, closeOnOutsideClick: true, ignoreClicksOnByClass: overlayIgnoredClasses, onClose: onClose, positionType: "fixed" },
            React.createElement(IntlWrapper, { locale: locale },
                React.createElement(DrillDialog, { insightTitle: baseInsightTitle, isBackButtonVisible: breadcrumbs.length > 1, onBackButtonClick: onBackButtonClick, onCloseDialog: onClose, breadcrumbs: breadcrumbs, exportAvailable: exportXLSXEnabled || exportCSVEnabled, exportXLSXEnabled: exportXLSXEnabled, exportCSVEnabled: exportCSVEnabled, onExportXLSX: onExportXLSX, onExportCSV: onExportCSV, isLoading: isLoading },
                    React.createElement(WithDrillSelect, { widgetRef: widget.ref, insight: props.insight, onDrillDownSuccess: onDrillDown }, ({ onDrill }) => {
                        return (React.createElement(DrillDialogInsight, Object.assign({}, props, { onDrill: onDrill, onLoadingChanged: handleLoadingChanged, onError: executionsHandler.onError, pushData: executionsHandler.onPushData, ErrorComponent: ErrorComponent, LoadingComponent: LoadingComponent })));
                    }))))));
};
//# sourceMappingURL=InsightDrillDialog.js.map