import { TargetAppLanguage, AppTemplate } from "../types.js";
export type WorkspaceChoices = {
    name: string;
    value: string;
};
export declare function promptName(object?: string): Promise<string>;
export declare function promptLanguage(): Promise<TargetAppLanguage>;
export declare function promptTemplate(): Promise<AppTemplate>;
//# sourceMappingURL=prompts.d.ts.map