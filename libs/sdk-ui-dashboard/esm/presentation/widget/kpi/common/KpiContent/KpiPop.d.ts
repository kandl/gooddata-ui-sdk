import React from "react";
import { WrappedComponentProps } from "react-intl";
import { ISeparators } from "@gooddata/sdk-ui";
export interface IKpiPopProps {
    currentPeriodValue: number | null;
    previousPeriodValue: number | null;
    error?: Error | null;
    format?: string;
    meaning?: string;
    disabled?: boolean;
    isLoading?: boolean;
    previousPeriodName?: string;
    separators?: ISeparators;
    enableCompactSize?: boolean;
    clientWidth?: number;
    clientHeight?: number;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IKpiPopProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IKpiPopProps & WrappedComponentProps>;
};
export default _default;
