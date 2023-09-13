import { GoodDataSdkError, IErrorProps } from "@gooddata/sdk-ui";
import { WrappedComponentProps } from "react-intl";
import React from "react";
/**
 * @internal
 */
export interface IInsightErrorProps {
    error: GoodDataSdkError;
    ErrorComponent?: React.ComponentType<IErrorProps>;
    height?: number | string | null;
    clientHeight?: number;
}
/**
 * @internal
 */
export declare const InsightError: React.FC<import("react-intl").WithIntlProps<IInsightErrorProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IInsightErrorProps & WrappedComponentProps>;
};
//# sourceMappingURL=InsightError.d.ts.map