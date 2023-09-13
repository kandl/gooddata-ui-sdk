/// <reference types="react" />
export interface IButtonWithTypeIcon {
    icon?: string;
    value: string;
    className?: string;
    isOpen: boolean;
    onClick: () => void;
}
export declare const ButtonWithIcon: (props: IButtonWithTypeIcon) => JSX.Element;
