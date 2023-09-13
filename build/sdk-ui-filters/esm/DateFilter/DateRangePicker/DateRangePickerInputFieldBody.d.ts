import React from "react";
export declare class DateRangePickerInputFieldBody extends React.Component<React.InputHTMLAttributes<HTMLInputElement>> {
    private inputRef;
    invokeInputMethod: (key: "blur" | "focus") => void;
    blur: () => void;
    focus: () => void;
    get value(): string;
    render(): JSX.Element;
}
