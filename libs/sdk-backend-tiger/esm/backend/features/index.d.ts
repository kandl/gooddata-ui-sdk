import { IUserProfile, FeatureContext, JsonApiWorkspaceOutAttributes } from "@gooddata/api-client-tiger";
import { TigerAuthenticatedCallGuard } from "../../types/index.js";
import { ITigerFeatureFlags } from "../uiFeatures.js";
export declare class TigerFeaturesService {
    private readonly authCall;
    constructor(authCall: TigerAuthenticatedCallGuard);
    getFeatures(profile?: IUserProfile, wsContext?: Partial<FeatureContext>): Promise<ITigerFeatureFlags>;
}
export declare function pickContext(attributes: JsonApiWorkspaceOutAttributes | undefined, organizationId: string | undefined): Partial<FeatureContext>;
//# sourceMappingURL=index.d.ts.map