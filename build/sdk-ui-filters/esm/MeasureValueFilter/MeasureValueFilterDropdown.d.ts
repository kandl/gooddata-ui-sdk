import React from "react";
import { IMeasureValueFilterCommonProps } from "./typings.js";
/**
 * @beta
 */
export interface IMeasureValueFilterDropdownProps extends IMeasureValueFilterCommonProps {
    onCancel: () => void;
    anchorEl?: HTMLElement | string;
}
/**
 * @beta
 */
export declare class MeasureValueFilterDropdown extends React.PureComponent<IMeasureValueFilterDropdownProps> {
    static defaultProps: Pick<IMeasureValueFilterDropdownProps, "displayTreatNullAsZeroOption" | "treatNullAsZeroDefaultValue" | "enableOperatorSelection">;
    render(): JSX.Element;
    private onApply;
}
