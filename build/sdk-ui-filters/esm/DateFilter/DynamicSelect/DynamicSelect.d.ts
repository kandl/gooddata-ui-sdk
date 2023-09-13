import React from "react";
import { DynamicSelectItem, DynamicSelectOption } from "./types.js";
export interface IDynamicSelectProps {
    getItems: (inputValue: string) => DynamicSelectItem[];
    onChange?: (item: number) => void;
    initialIsOpen?: boolean;
    placeholder?: string;
    value?: number;
    className?: string;
    style?: React.CSSProperties;
    optionClassName?: string;
    visibleItemsRange?: number;
    customValueValidator?: (value: string) => boolean;
}
export interface IDynamicSelectState {
    inputValue: string;
}
export declare class DynamicSelect extends React.Component<IDynamicSelectProps, IDynamicSelectState> {
    constructor(props: IDynamicSelectProps);
    inputRef: React.RefObject<HTMLDivElement>;
    static defaultProps: Pick<IDynamicSelectProps, "onChange" | "initialIsOpen" | "visibleItemsRange">;
    onChange: (option: DynamicSelectOption | null) => void;
    componentDidUpdate: (lastProps: IDynamicSelectProps) => void;
    focus: () => void;
    blur: () => void;
    onInputValueChanged: (inputValue: string) => void;
    render(): JSX.Element;
    private onBlurHandler;
    private onChangeHandler;
}
