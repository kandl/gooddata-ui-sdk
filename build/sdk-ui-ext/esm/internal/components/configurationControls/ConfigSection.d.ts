import React from "react";
import { WrappedComponentProps } from "react-intl";
export interface IConfigSectionOwnProps {
    id: string;
    valuePath?: string;
    canBeToggled?: boolean;
    toggleDisabled?: boolean;
    toggledOn?: boolean;
    propertiesMeta: any;
    properties?: any;
    title: string;
    subtitle?: string;
    showDisabledMessage?: boolean;
    className?: string;
    pushData?(data: any): void;
    children?: React.ReactNode;
    toggleMessageId?: string;
}
export interface IConfigSectionState {
    collapsed: boolean;
}
export type IConfigSectionProps = IConfigSectionOwnProps & WrappedComponentProps;
export declare class ConfigSection extends React.Component<IConfigSectionProps, IConfigSectionState> {
    static defaultProps: {
        collapsed: boolean;
        canBeToggled: boolean;
        toggleDisabled: boolean;
        toggledOn: boolean;
        disabled: boolean;
        pushData: (...args: any[]) => void;
        showDisabledMessage: boolean;
        className: string;
        properties: {};
    };
    constructor(props: IConfigSectionOwnProps & WrappedComponentProps);
    UNSAFE_componentWillReceiveProps(nextProps: IConfigSectionOwnProps & WrappedComponentProps): void;
    render(): JSX.Element;
    private renderToggleSwitch;
    private getHeaderClassNames;
    private getToggleLabelClassNames;
    private getSectionClassNames;
    private toggleCollapsed;
    private toggleValue;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IConfigSectionProps>> & {
    WrappedComponent: React.ComponentType<IConfigSectionProps>;
};
export default _default;
//# sourceMappingURL=ConfigSection.d.ts.map