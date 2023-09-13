import { ITigerFeatureFlags } from "../uiFeatures.js";
export type FeatureDef = {
    id: string;
    key: string;
    l: boolean;
    version: string;
    type: "BOOLEAN" | "STRING" | "NUMBER" | "JSON";
    value: any;
};
export type FeaturesMap = Record<string, FeatureDef>;
export declare function mapFeatures(features: FeaturesMap): Partial<ITigerFeatureFlags>;
//# sourceMappingURL=feature.d.ts.map