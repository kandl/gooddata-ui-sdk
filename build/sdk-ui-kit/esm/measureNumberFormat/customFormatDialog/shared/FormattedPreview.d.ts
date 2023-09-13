import React from "react";
import { ISeparators } from "@gooddata/number-formatter";
export declare const Label: React.FC<{
    value?: string;
    style?: React.CSSProperties;
    className?: string;
}>;
export interface IFormattedPreviewProps {
    previewNumber: number | null;
    format: string;
    colors?: boolean;
    separators?: ISeparators;
    className?: string;
}
export declare const FormattedPreview: React.FC<IFormattedPreviewProps>;
//# sourceMappingURL=FormattedPreview.d.ts.map