import * as React from "react";
export interface IScheduleDropdownProps {
    title: string;
    applyDisabled?: boolean;
    iconComponent?: React.ReactNode;
    onApply?: () => void;
    onCancel?: () => void;
    contentComponent?: React.ReactNode;
    buttonClassName?: string;
    bodyClassName?: string;
    buttonDisabled?: boolean;
}
export declare const ScheduleDropdown: React.FC<IScheduleDropdownProps>;
