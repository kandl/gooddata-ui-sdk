import React from "react";
import { IReactOptions, IWebComponentsOptions, EmbedOptionsType } from "../types.js";
interface IEmbedInsightContentProps {
    integrationDocLink: string;
    embedTypeOptions: EmbedOptionsType;
    code: string;
    openSaveInsightDialog: () => void;
    onCopyCode: () => void;
    onOptionsChange: (opt: IReactOptions | IWebComponentsOptions) => void;
}
/**
 * @internal
 */
export declare const EmbedInsightContent: React.FC<IEmbedInsightContentProps>;
export {};
//# sourceMappingURL=EmbedInsightContent.d.ts.map