import { TargetAppLanguage, TargetBackendType } from "../types.js";
export declare function promptUsername(wording?: string): Promise<string>;
export declare function promptPassword(): Promise<string>;
export declare function promptApiToken(): Promise<string>;
export type WorkspaceChoices = {
    name: string;
    value: string;
};
export declare function promptWorkspaceId(choices: WorkspaceChoices[]): Promise<string>;
export declare function promptWorkspaceIdWithoutChoice(): Promise<string>;
export declare function promptDashboardIdWithoutChoice(wording: string): Promise<string>;
export declare function promptName(object?: string): Promise<string>;
export declare function promptHostname(backend: TargetBackendType): Promise<string>;
export declare function promptBackend(): Promise<TargetBackendType>;
export declare function promptLanguage(): Promise<TargetAppLanguage>;
export declare function promptPluginParameters(originalParameters?: string): Promise<string>;
//# sourceMappingURL=prompts.d.ts.map