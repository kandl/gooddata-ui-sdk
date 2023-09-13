import * as React from "react";
interface ITextareaOwnProps {
    className: string;
    hasError: boolean;
    hasWarning: boolean;
    label: string;
    maxlength?: number;
    placeholder: string;
    value: string;
    rows: number;
    onChange: (value: string) => void;
}
interface ITextareaState {
    rows: number;
}
export type ITextareaProps = ITextareaOwnProps;
export declare class Textarea extends React.PureComponent<ITextareaProps, ITextareaState> {
    static defaultProps: {
        className: string;
        hasError: boolean;
        hasWarning: boolean;
    };
    constructor(props: ITextareaProps);
    render(): JSX.Element;
    private getTextareaClassNames;
    private onBlur;
    private onChange;
    private onFocus;
    private renderCollapseIndicator;
}
export {};
