import { IWorkspaceSettings, IWorkspaceSettingsService, IUserWorkspaceSettings } from "@gooddata/sdk-backend-spi";
import { ISettings } from "@gooddata/sdk-model";
import { IFeatureFlags } from "@gooddata/api-client-bear";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare const mergeWorkspaceAndUserSettings: (workspaceFeatureFlags: IFeatureFlags, userFeatureFlags: IFeatureFlags) => ISettings;
export declare class BearWorkspaceSettings implements IWorkspaceSettingsService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    getSettings(): Promise<IWorkspaceSettings>;
    getSettingsForCurrentUser(): Promise<IUserWorkspaceSettings>;
    setLocale(_locale: string): Promise<void>;
}
//# sourceMappingURL=settings.d.ts.map