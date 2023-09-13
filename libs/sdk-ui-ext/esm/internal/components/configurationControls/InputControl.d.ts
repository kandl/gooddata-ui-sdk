import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IVisualizationProperties } from "../../interfaces/Visualization.js";
export interface IInputControlProps {
    valuePath: string;
    properties: IVisualizationProperties;
    labelText?: string;
    value?: string;
    placeholder?: string;
    type?: string;
    max?: number;
    min?: number;
    step?: number;
    disabled?: boolean;
    showDisabledMessage?: boolean;
    disabledMessageId?: string;
    hasWarning?: boolean;
    pushData?(data: any): void;
    validateAndPushDataCallback?(value: string): void;
    maxLength?: number;
}
export interface IInputControlState {
    value?: string;
    lastSentValue?: string;
}
export declare class InputControl extends React.Component<IInputControlProps & WrappedComponentProps, IInputControlState> {
    static defaultProps: {
        value: string;
        type: string;
        disabled: boolean;
        pushData: (...args: any[]) => void;
        max: number;
        min: number;
        step: number;
        showDisabledMessage: boolean;
        hasWarning: boolean;
        validateAndPushDataCallback: (...args: any[]) => void;
    };
    private inputRef;
    constructor(props: IInputControlProps & WrappedComponentProps);
    UNSAFE_componentWillReceiveProps(newProps: IInputControlProps & WrappedComponentProps): void;
    render(): JSX.Element;
    private getInputClassNames;
    private isValid;
    private onValueChanged;
    private triggerBlur;
    private modifyDataForSending;
    private emitData;
    private onBlur;
    private onKeyPress;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IInputControlProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IInputControlProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=InputControl.d.ts.map