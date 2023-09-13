import { IDrillEvent, IDrillEventIntersectionElement } from "@gooddata/sdk-ui";
import { ObjRef, IDrillToCustomUrl, IAttributeDisplayFormMetadataObject } from "@gooddata/sdk-model";
import { DashboardContext } from "../../types/commonTypes.js";
import { SagaIterator } from "redux-saga";
import { DrillToCustomUrl } from "../../commands/drill.js";
interface IDrillToUrlPlaceholderReplacement {
    toBeReplaced: string;
    replacement: string;
    replaceGlobally?: boolean;
}
interface IDrillToUrlElement {
    identifier: string;
    elementTitle: string | null;
}
export declare function loadElementTitle(dfRef: ObjRef, dfIdentifier: string, attrElementUri: string, ctx: DashboardContext): SagaIterator<IDrillToUrlElement>;
export declare function splitDFToLoadingAndMapping(attributesDisplayForms: IAttributeDisplayFormMetadataObject[], ctx: DashboardContext): SagaIterator<{
    displayFormsWithKnownValues: IAttributeDisplayFormMetadataObject[];
    displayFormForValueLoad: IAttributeDisplayFormMetadataObject[];
}>;
export declare function loadAttributeElementsForDrillIntersection(drillIntersectionElements: IDrillEventIntersectionElement[], attributesDisplayForms: IAttributeDisplayFormMetadataObject[], ctx: DashboardContext): SagaIterator<IDrillToUrlElement[]>;
export declare function getAttributeDisplayForms(projectId: string, objRefs: ObjRef[], ctx: DashboardContext): Promise<IAttributeDisplayFormMetadataObject[]>;
export declare function getAttributeIdentifiersReplacements(url: string, drillIntersectionElements: IDrillEventIntersectionElement[], ctx: DashboardContext): SagaIterator<IDrillToUrlPlaceholderReplacement[]>;
export declare function getInsightIdentifiersReplacements(customUrl: string, widgetRef: ObjRef, ctx: DashboardContext): SagaIterator<IDrillToUrlPlaceholderReplacement[]>;
export declare function resolveDrillToCustomUrl(drillConfig: IDrillToCustomUrl, widgetRef: ObjRef, event: IDrillEvent, ctx: DashboardContext, cmd: DrillToCustomUrl): SagaIterator<string>;
export {};
