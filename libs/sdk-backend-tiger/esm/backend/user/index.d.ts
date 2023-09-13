import { IUser } from "@gooddata/sdk-model";
import { IUserService, IUserSettingsService } from "@gooddata/sdk-backend-spi";
import { TigerAuthenticatedCallGuard } from "../../types/index.js";
export declare class TigerUserService implements IUserService {
    private readonly authCall;
    constructor(authCall: TigerAuthenticatedCallGuard);
    settings(): IUserSettingsService;
    getUser(): Promise<IUser>;
}
//# sourceMappingURL=index.d.ts.map