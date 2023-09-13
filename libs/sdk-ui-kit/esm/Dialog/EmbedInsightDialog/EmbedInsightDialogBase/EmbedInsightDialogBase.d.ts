import React from "react";
import { CopyCodeOriginType, EmbedType, IReactOptions, IWebComponentsOptions } from "./types.js";
/**
 * @internal
 */
export type IEmbedInsightDialogBaseProps = {
    code: string;
    embedTab: EmbedType;
    embedTypeOptions: IReactOptions | IWebComponentsOptions;
    propertiesLink?: string;
    integrationDocLink?: string;
    showWebComponentsTab?: boolean;
    openSaveInsightDialog: () => void;
    onClose: () => void;
    onCopyCode: (code: string, type: CopyCodeOriginType, codeType: EmbedType) => void;
    onOptionsChange: (opt: IReactOptions | IWebComponentsOptions) => void;
    onTabChange: (selectedTab: EmbedType) => void;
};
/**
 * @internal
 */
export declare const EmbedInsightDialogBase: React.VFC<IEmbedInsightDialogBaseProps>;
//# sourceMappingURL=EmbedInsightDialogBase.d.ts.map