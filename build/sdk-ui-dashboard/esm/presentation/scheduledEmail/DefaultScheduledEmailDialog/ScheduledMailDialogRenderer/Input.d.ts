import * as React from "react";
interface IInputOwnProps {
    className?: string;
    label: string;
    maxlength?: number;
    placeholder: string;
    value?: string;
    onChange: (value: string) => void;
}
export type IInputProps = IInputOwnProps;
export declare const Input: React.FC<IInputProps>;
export {};
