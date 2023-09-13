import React from "react";
import { IMeasureValueFilterCommonProps } from "./typings.js";
/**
 * @beta
 */
export interface IMeasureValueFilterProps extends IMeasureValueFilterCommonProps {
    buttonTitle: string;
    onCancel?: () => void;
}
/**
 * @beta
 */
export interface IMeasureValueFilterState {
    displayDropdown: boolean;
}
/**
 * @beta
 */
export declare class MeasureValueFilter extends React.PureComponent<IMeasureValueFilterProps, IMeasureValueFilterState> {
    static defaultProps: Partial<IMeasureValueFilterProps>;
    state: IMeasureValueFilterState;
    private buttonRef;
    render(): JSX.Element;
    private onApply;
    private onCancel;
    private closeDropdown;
    private toggleDropdown;
}
