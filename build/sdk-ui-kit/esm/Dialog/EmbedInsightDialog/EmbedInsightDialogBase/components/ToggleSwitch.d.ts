import React from "react";
export interface IToggleSwitchProps {
    id: string;
    label: string;
    questionMarkMessage?: string;
    checked?: boolean;
    disabled?: boolean;
    className?: string;
    onChange: () => void;
}
export declare const ToggleSwitch: React.VFC<IToggleSwitchProps>;
//# sourceMappingURL=ToggleSwitch.d.ts.map