import React from "react";
import { ScreenSize } from "@gooddata/sdk-model";
interface IDashboardItemProps extends React.HTMLAttributes<HTMLDivElement> {
    screen: ScreenSize;
}
export declare const DashboardItem: React.FC<IDashboardItemProps>;
export {};
