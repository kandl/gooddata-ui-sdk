import { Action, CaseReducer } from "@reduxjs/toolkit";
import { CatalogState } from "./catalogState.js";
import { ICatalogAttribute, ICatalogFact, ICatalogMeasure, ICatalogDateDataset, ICatalogAttributeHierarchy } from "@gooddata/sdk-model";
type CatalogReducer<A extends Action> = CaseReducer<CatalogState, A>;
export interface SetCatalogItemsPayload {
    attributes: ICatalogAttribute[];
    measures: ICatalogMeasure[];
    facts: ICatalogFact[];
    dateDatasets: ICatalogDateDataset[];
    attributeHierarchies: ICatalogAttributeHierarchy[];
}
export declare const catalogReducers: {
    setCatalogItems: CatalogReducer<{
        payload: SetCatalogItemsPayload;
        type: string;
    }>;
};
export {};
