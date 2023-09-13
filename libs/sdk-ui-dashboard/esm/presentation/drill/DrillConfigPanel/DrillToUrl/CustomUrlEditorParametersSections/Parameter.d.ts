import React from "react";
import { IntlShape } from "react-intl";
interface IParameterProps {
    name: string;
    description?: string;
    detailContent: JSX.Element;
    iconClassName: string;
    onAdd: () => void;
    intl: IntlShape;
}
export declare const Parameter: React.FC<IParameterProps>;
export {};
