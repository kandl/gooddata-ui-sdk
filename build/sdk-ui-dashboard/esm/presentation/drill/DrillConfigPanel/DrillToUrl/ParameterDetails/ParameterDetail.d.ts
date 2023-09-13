import React from "react";
interface IParameterDetailProps {
    title: string;
    typeName: string;
    label?: string;
    isLoading?: boolean;
    useEllipsis?: boolean;
    values: string[];
    additionalValues?: number;
}
export declare const ParameterDetail: React.FC<IParameterDetailProps>;
export {};
