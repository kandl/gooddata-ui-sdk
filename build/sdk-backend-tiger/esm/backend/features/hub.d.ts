import { ILiveFeatures, FeatureContext } from "@gooddata/api-client-tiger";
import { ITigerFeatureFlags } from "../uiFeatures.js";
import { FeatureDef } from "./feature.js";
export declare function getFeatureHubFeatures(features: ILiveFeatures["live"], wsContext?: Partial<FeatureContext>): Promise<Partial<ITigerFeatureFlags>>;
export type FeatureHubResponse = {
    id: string;
    features: FeatureDef[];
}[];
//# sourceMappingURL=hub.d.ts.map