import React from "react";
import { IDashboardWidgetOverlay } from "../../../model/index.js";
type DashboardItemOverlayProps = {
    render?: boolean;
    type: "row" | "column";
    modifications: Required<IDashboardWidgetOverlay>["modification"][];
    onHide?: () => void;
};
export declare const DashboardItemOverlay: React.FunctionComponent<DashboardItemOverlayProps>;
export {};
