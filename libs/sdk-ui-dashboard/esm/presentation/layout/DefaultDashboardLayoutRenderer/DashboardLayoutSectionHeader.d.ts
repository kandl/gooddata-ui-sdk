import React from "react";
/**
 * @alpha
 */
export interface IDashboardLayoutSectionHeaderProps {
    title?: string;
    description?: string;
    /**
     * This prop is here to allow rendering row hotspots in gdc-dashboards edit mode
     * in the same DOM location as before without duplicating css classes / DOM structure,
     * because we want to have all the logic and styling of the dashboard layout in one place,
     * to keep the look of Dashboard component in sync with gdc-dashboards.
     */
    renderBeforeHeader?: React.ReactNode;
    /**
     * This prop is here to allow rendering editable row header in gdc-dashboards edit mode
     * in the same DOM location as before without duplicating css classes / DOM structure,
     * because we want to have all the logic and styling of the dashboard layout in one place,
     * to keep the look of Dashboard component in sync with gdc-dashboards.
     */
    renderHeader?: React.ReactNode;
}
export declare const DashboardLayoutSectionHeader: React.FC<IDashboardLayoutSectionHeaderProps>;
