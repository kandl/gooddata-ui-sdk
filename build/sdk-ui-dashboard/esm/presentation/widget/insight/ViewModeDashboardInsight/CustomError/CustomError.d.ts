import React from "react";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
interface ICustomErrorProps {
    error: GoodDataSdkError;
    height?: number;
    width?: number;
    isCustomWidgetHeightEnabled?: boolean;
    forceFullContent?: boolean;
}
export declare const CustomError: React.FC<ICustomErrorProps>;
export {};
