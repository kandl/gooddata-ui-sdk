// (C) 2021-2022 GoodData Corporation
import React from "react";
import { ExportDialogProvider } from "../../dialogs/index.js";
import { TopBar, useTopBarProps } from "../../topBar/index.js";
import { SaveAsDialog, useSaveAsDialogProps } from "../../saveAs/index.js";
import { FilterBar, useFilterBarProps } from "../../filterBar/index.js";
import { ShareDialogDashboardHeader } from "./ShareDialogDashboardHeader.js";
import { ScheduledEmailDialogProvider } from "./ScheduledEmailDialogProvider.js";
import { DeleteDialog, useDeleteDialogProps } from "../../deleteDialog/index.js";
import { KpiDeleteDialog, useKpiDeleteDialogProps } from "../../kpiDeleteDialog/index.js";
import { CancelEditDialog, useCancelEditDialog } from "../../cancelEditDialog/index.js";
import { ToastMessages } from "../components/ToastMessages.js";
// these wrapper components are here to prevent the whole DashboardHeader from re-rendering whenever some
// of the sub-components' props change. by isolating the hooks more, we make sure only the really changed component re-renders.
const DeleteDialogWrapper = () => {
    const deleteDialogProps = useDeleteDialogProps();
    return React.createElement(DeleteDialog, Object.assign({}, deleteDialogProps));
};
const KpiDeleteDialogWrapper = () => {
    const kpiDeleteDialogProps = useKpiDeleteDialogProps();
    return React.createElement(KpiDeleteDialog, Object.assign({}, kpiDeleteDialogProps));
};
const SaveAsDialogWrapper = () => {
    const saveAsDialogProps = useSaveAsDialogProps();
    return React.createElement(SaveAsDialog, Object.assign({}, saveAsDialogProps));
};
const TopBarWrapper = () => {
    const topBarProps = useTopBarProps();
    return React.createElement(TopBar, Object.assign({}, topBarProps));
};
const FilterBarWrapper = () => {
    const filterBarProps = useFilterBarProps();
    return React.createElement(FilterBar, Object.assign({}, filterBarProps));
};
const CancelEditDialogWrapper = () => {
    const cancelEditDialogProps = useCancelEditDialog();
    return React.createElement(CancelEditDialog, Object.assign({}, cancelEditDialogProps));
};
// split the header parts of the dashboard so that changes to their state
// (e.g. opening email dialog) do not re-render the dashboard body
export const DashboardHeader = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement(ToastMessages, null),
        React.createElement(ExportDialogProvider, null),
        React.createElement(ScheduledEmailDialogProvider, null),
        React.createElement(ShareDialogDashboardHeader, null),
        React.createElement(DeleteDialogWrapper, null),
        React.createElement(KpiDeleteDialogWrapper, null),
        React.createElement(SaveAsDialogWrapper, null),
        React.createElement(TopBarWrapper, null),
        React.createElement(FilterBarWrapper, null),
        React.createElement(CancelEditDialogWrapper, null)));
};
//# sourceMappingURL=DashboardHeader.js.map