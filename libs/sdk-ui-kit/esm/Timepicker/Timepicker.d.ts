import React from "react";
import { WrappedComponentProps } from "react-intl";
import { OverlayPositionType } from "../typings/overlay.js";
import { formatTime, normalizeTime } from "./utils/timeUtilities.js";
export { normalizeTime, formatTime };
/**
 * @internal
 */
export interface ITimepickerOwnProps {
    time: Date;
    className?: string;
    maxVisibleItemsCount?: number;
    onChange?: (selectedTime: Date) => void;
    overlayPositionType?: OverlayPositionType;
    overlayZIndex?: number;
    locale?: string;
    skipNormalizeTime?: boolean;
}
export type TimePickerProps = ITimepickerOwnProps & WrappedComponentProps;
interface ITimePickerState {
    dropdownWidth: number;
    selectedTime: Date;
}
export declare class WrappedTimepicker extends React.PureComponent<TimePickerProps, ITimePickerState> {
    dropdownRef: React.RefObject<HTMLDivElement>;
    static defaultProps: {
        className: string;
        maxVisibleItemsCount: number;
        time: Date;
        onChange: (...args: any[]) => void;
        overlayZIndex: number;
        skipNormalizeTime: boolean;
    };
    constructor(props: TimePickerProps);
    UNSAFE_componentWillReceiveProps(newProps: TimePickerProps): void;
    componentDidMount(): void;
    private getComponentClasses;
    private getTimeItems;
    private updateDropdownWidth;
    private updateLocaleForMoment;
    private handleTimeChanged;
    render(): JSX.Element;
}
/**
 * @internal
 */
export declare class Timepicker extends React.PureComponent<ITimepickerOwnProps> {
    render(): JSX.Element;
}
//# sourceMappingURL=Timepicker.d.ts.map