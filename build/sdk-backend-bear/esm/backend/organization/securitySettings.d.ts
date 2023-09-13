import { ISecuritySettingsService, ValidationContext } from "@gooddata/sdk-backend-spi";
import { BearAuthenticatedCallGuard } from "../../types/auth.js";
export interface IValidationResponse {
    validationResponse: {
        valid: boolean;
    };
}
export declare class SecuritySettingsService implements ISecuritySettingsService {
    private readonly authCall;
    readonly scope: string;
    /**
     * Constructs a new SecuritySettingsService
     * @param authCall - call guard to perform API calls through
     * @param scope - URI of the scope. For now only the organization (domain) URI is supported by the backend.
     *  The plan is to support also workspace URI and user profile URI.
     */
    constructor(authCall: BearAuthenticatedCallGuard, scope: string);
    isUrlValid: (url: string, context: ValidationContext) => Promise<boolean>;
    isDashboardPluginUrlValid: (url: string, workspace: string) => Promise<boolean>;
}
export declare function validateAgainstList(url: string, listContent: any): boolean;
//# sourceMappingURL=securitySettings.d.ts.map