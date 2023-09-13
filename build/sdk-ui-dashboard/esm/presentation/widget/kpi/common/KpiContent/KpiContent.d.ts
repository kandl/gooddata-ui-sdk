import React from "react";
import { WrappedComponentProps } from "react-intl";
import { GoodDataSdkError, ISeparators } from "@gooddata/sdk-ui";
import { IFilter, IKpiWidget, IKpiWidgetDefinition } from "@gooddata/sdk-model";
import { IKpiResult } from "../types.js";
export interface IKpiContentProps {
    kpi: IKpiWidget | IKpiWidgetDefinition;
    isLoading: boolean;
    filters?: IFilter[];
    separators?: ISeparators;
    kpiResult: IKpiResult | undefined;
    error?: GoodDataSdkError | undefined;
    errorHelp?: string;
    enableCompactSize?: boolean;
    isInEditMode: boolean;
    isKpiUnderlineHiddenWhenClickable?: boolean;
    isKpiValueClickDisabled?: boolean;
    onKpiValueClick?: () => void;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IKpiContentProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IKpiContentProps & WrappedComponentProps>;
};
export default _default;
