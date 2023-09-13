import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IWidgetAlertDefinition } from "@gooddata/sdk-model";
interface IKpiAlertDialogWhenTriggeredPickerProps extends WrappedComponentProps {
    whenTriggered: IWidgetAlertDefinition["whenTriggered"];
    onWhenTriggeredChange: (whenTriggered: IWidgetAlertDefinition["whenTriggered"]) => void;
}
export declare const KpiAlertDialogWhenTriggeredPicker: React.FC<IKpiAlertDialogWhenTriggeredPickerProps>;
export {};
