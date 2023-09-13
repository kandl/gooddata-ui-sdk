import { ObjectType } from "@gooddata/sdk-model";
import { TigerObjectType } from "./index.js";
/**
 * @alpha
 */
export type TigerCompatibleObjectType = Exclude<ObjectType, "tag">;
/**
 * @alpha
 */
export declare const tigerIdTypeToObjectType: {
    [tigerType in TigerObjectType]: TigerCompatibleObjectType;
};
/**
 * @alpha
 */
export declare const objectTypeToTigerIdType: {
    measure: TigerObjectType;
    fact: TigerObjectType;
    attribute: TigerObjectType;
    displayForm: TigerObjectType;
    dataSet: TigerObjectType;
    insight: TigerObjectType;
    variable: TigerObjectType;
    analyticalDashboard: TigerObjectType;
    theme: TigerObjectType;
    colorPalette: TigerObjectType;
    filterContext: TigerObjectType;
    dashboardPlugin: TigerObjectType;
    attributeHierarchy: TigerObjectType;
};
/**
 * @alpha
 */
export declare const isTigerCompatibleType: (obj: unknown) => obj is TigerObjectType;
/**
 * @alpha
 */
export declare const isTigerType: (obj: unknown) => obj is TigerObjectType;
//# sourceMappingURL=refTypeMapping.d.ts.map