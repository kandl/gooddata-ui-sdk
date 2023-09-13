import React from "react";
interface IDashboardItemContentWrapperProps {
    children: (params: {
        clientWidth: number | undefined;
        clientHeight: number | undefined;
    }) => React.ReactNode;
}
export declare const DashboardItemContentWrapper: React.FC<IDashboardItemContentWrapperProps>;
export {};
