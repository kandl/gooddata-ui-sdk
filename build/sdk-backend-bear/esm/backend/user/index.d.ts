import { IUser } from "@gooddata/sdk-model";
import { IUserService, IUserSettingsService } from "@gooddata/sdk-backend-spi";
import { BearAuthenticatedCallGuard } from "../../types/auth.js";
export declare class BearUserService implements IUserService {
    private readonly authCall;
    constructor(authCall: BearAuthenticatedCallGuard);
    settings(): IUserSettingsService;
    getUser(): Promise<IUser>;
}
//# sourceMappingURL=index.d.ts.map