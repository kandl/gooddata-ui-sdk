import React from "react";
import { WrappedComponentProps } from "react-intl";
import { ISeparators } from "@gooddata/sdk-ui";
export interface IKpiValueProps {
    error?: Error | null;
    errorHelp?: string;
    separators?: ISeparators;
    value: string | number | undefined | null;
    format?: string;
    isLoading?: boolean;
    disableKpiDrillUnderline?: boolean;
    enableCompactSize?: boolean;
    clientHeight?: number;
    hasComparison?: boolean;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IKpiValueProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IKpiValueProps & WrappedComponentProps>;
};
export default _default;
