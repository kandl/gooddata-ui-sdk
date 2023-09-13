import { IInsight, ObjRef, ObjRefInScope, IDrillToAttributeUrl, IDrillToCustomUrl, InsightDrillDefinition, IAttributeDisplayFormMetadataObject, IListedDashboard } from "@gooddata/sdk-model";
import { IAvailableDrillTargets } from "@gooddata/sdk-ui";
import { ObjRefMap } from "../../../../_staging/metadata/objRefMap.js";
import { IInaccessibleDashboard } from "../../../types/inaccessibleDashboardTypes.js";
export declare function validateDrillDefinitionOrigin(drillDefinition: InsightDrillDefinition, drillTargets: IAvailableDrillTargets): InsightDrillDefinition;
export declare function existsDrillDefinitionInArray(drillDefinition: InsightDrillDefinition, drillDefinitionArray?: InsightDrillDefinition[]): boolean;
export declare function getDrillDefinitionFromArray(drillDefinition: InsightDrillDefinition, drillDefinitionArray?: InsightDrillDefinition[]): InsightDrillDefinition | undefined;
export declare function validateDrillDefinitionByLocalIdentifier(ref: ObjRefInScope, drillDefinitionArray?: InsightDrillDefinition[]): InsightDrillDefinition;
export declare function extractInsightRefs(items: ReadonlyArray<InsightDrillDefinition>): ObjRef[];
export declare function extractDisplayFormIdentifiers(drillDefinitions: InsightDrillDefinition[]): ObjRef[];
export interface InsightDrillDefinitionValidationData {
    dashboardsMap: ObjRefMap<IListedDashboard>;
    insightsMap: ObjRefMap<IInsight>;
    displayFormsMap: ObjRefMap<IAttributeDisplayFormMetadataObject>;
    availableDrillTargets: IAvailableDrillTargets;
    inaccessibleDashboardsMap: ObjRefMap<IInaccessibleDashboard>;
}
export declare function validateInsightDrillDefinition(drillDefinition: InsightDrillDefinition, validationContext: InsightDrillDefinitionValidationData): InsightDrillDefinition;
export declare function validateDrillToCustomURLDefinition(drillDefinition: IDrillToCustomUrl, validationContext: InsightDrillDefinitionValidationData): IDrillToCustomUrl;
export declare function validateDrillToAttributeUrlDefinition(drillDefinition: IDrillToAttributeUrl, validationContext: InsightDrillDefinitionValidationData): IDrillToAttributeUrl;
