import { IUserSettingsService, IUserSettings } from "@gooddata/sdk-backend-spi";
import { BearAuthenticatedCallGuard } from "../../types/auth.js";
export declare class BearUserSettingsService implements IUserSettingsService {
    private readonly authCall;
    constructor(authCall: BearAuthenticatedCallGuard);
    getSettings(): Promise<IUserSettings>;
    setLocale(_locale: string): Promise<void>;
}
//# sourceMappingURL=settings.d.ts.map