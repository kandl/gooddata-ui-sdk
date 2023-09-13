import React from "react";
export interface IVisualizationListNoDataProps {
    hasNoMatchingData: boolean;
    isUserInsights: boolean;
    showNoDataCreateButton?: boolean;
    onCreateButtonClick: (event: React.MouseEvent) => void;
}
export declare const InsightListNoData: React.FC<IVisualizationListNoDataProps>;
