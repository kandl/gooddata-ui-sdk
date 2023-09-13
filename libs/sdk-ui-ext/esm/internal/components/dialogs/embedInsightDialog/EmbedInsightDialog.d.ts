import React from "react";
import { IColorPalette, IExecutionConfig, IInsight } from "@gooddata/sdk-model";
import { CopyCodeOriginType, EmbedType } from "@gooddata/sdk-ui-kit";
import { IAnalyticalBackend, IUserWorkspaceSettings } from "@gooddata/sdk-backend-spi";
/**
 * @internal
 */
export interface IEmbedInsightDialogProps {
    insight: IInsight;
    locale?: string;
    backend?: IAnalyticalBackend;
    reactIntegrationDocLink?: string;
    webComponentIntegrationDocLink?: string;
    saveInsightDocLink?: string;
    settings?: IUserWorkspaceSettings;
    colorPalette?: IColorPalette;
    executionConfig?: IExecutionConfig;
    workspaceId?: string;
    showWebComponentsTab?: boolean;
    openSaveInsightDialog: () => void;
    onClose: () => void;
    onCopyCode: (code: string, type: CopyCodeOriginType, codeType: EmbedType) => void;
}
/**
 * @internal
 */
export declare const EmbedInsightDialog: React.VFC<IEmbedInsightDialogProps>;
//# sourceMappingURL=EmbedInsightDialog.d.ts.map