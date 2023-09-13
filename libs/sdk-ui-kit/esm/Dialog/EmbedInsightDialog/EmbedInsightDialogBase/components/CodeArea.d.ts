import React from "react";
import { EmbedType, InsightCodeType } from "../types.js";
/**
 * @internal
 */
export interface ICodeAreaProps {
    code: string;
    onCopyCode: (code: string) => void;
}
/**
 * @internal
 */
export declare const CodeArea: React.FC<ICodeAreaProps>;
/**
 * @internal
 */
export interface ICodeAreaDisableMessageProps {
    embedType: EmbedType;
    componentType?: InsightCodeType;
    openSaveInsightDialog: () => void;
}
/**
 * @internal
 */
export declare const CodeAreaDisableMessage: React.VFC<ICodeAreaDisableMessageProps>;
export interface IEmbedInsightCodeAreaProps extends ICodeAreaProps, ICodeAreaDisableMessageProps {
}
/**
 * @internal
 */
export declare const EmbedInsightCodeArea: React.VFC<IEmbedInsightCodeAreaProps>;
//# sourceMappingURL=CodeArea.d.ts.map