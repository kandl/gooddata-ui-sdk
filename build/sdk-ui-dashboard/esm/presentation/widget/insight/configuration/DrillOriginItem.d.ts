import React from "react";
export interface IDrillOriginItemProps {
    title: string;
    type: string;
    localIdentifier: string;
    onDelete: (localIdentifier: string) => void;
    isDateAttribute: boolean;
}
export declare const DrillOriginItem: React.FunctionComponent<IDrillOriginItemProps>;
