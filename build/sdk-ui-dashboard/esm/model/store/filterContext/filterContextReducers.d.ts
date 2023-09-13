import { Action, CaseReducer } from "@reduxjs/toolkit";
import { FilterContextState } from "./filterContextState.js";
import { IAttributeElements, ObjRef, DateString, DateFilterGranularity, IDashboardObjectIdentity, DateFilterType, IDashboardAttributeFilterParent, IFilterContextDefinition, IAttributeDisplayFormMetadataObject, DashboardAttributeFilterSelectionMode } from "@gooddata/sdk-model";
import { IParentWithConnectingAttributes } from "../../types/attributeFilterTypes.js";
type FilterContextReducer<A extends Action> = CaseReducer<FilterContextState, A>;
type SetFilterContextPayload = {
    filterContextDefinition: IFilterContextDefinition;
    originalFilterContextDefinition?: IFilterContextDefinition;
    attributeFilterDisplayForms: IAttributeDisplayFormMetadataObject[];
    filterContextIdentity?: IDashboardObjectIdentity;
};
type SetFilterContextIdentityPayload = {
    filterContextIdentity?: IDashboardObjectIdentity;
};
export interface IUpsertDateFilterAllTimePayload {
    readonly type: "allTime";
}
export interface IUpsertDateFilterNonAllTimePayload {
    readonly type: DateFilterType;
    readonly granularity: DateFilterGranularity;
    readonly from?: DateString | number;
    readonly to?: DateString | number;
}
export type IUpsertDateFilterPayload = IUpsertDateFilterAllTimePayload | IUpsertDateFilterNonAllTimePayload;
export interface IUpdateAttributeFilterSelectionPayload {
    readonly filterLocalId: string;
    readonly elements: IAttributeElements;
    readonly negativeSelection: boolean;
}
export interface IAddAttributeFilterPayload {
    readonly displayForm: ObjRef;
    readonly index: number;
    readonly parentFilters?: ReadonlyArray<IDashboardAttributeFilterParent>;
    readonly initialSelection?: IAttributeElements;
    readonly initialIsNegativeSelection?: boolean;
    readonly selectionMode?: DashboardAttributeFilterSelectionMode;
}
export interface IRemoveAttributeFilterPayload {
    readonly filterLocalId: string;
}
export interface IMoveAttributeFilterPayload {
    readonly filterLocalId: string;
    readonly index: number;
}
export interface ISetAttributeFilterParentsPayload {
    readonly filterLocalId: string;
    readonly parentFilters: ReadonlyArray<IDashboardAttributeFilterParent>;
}
export interface IClearAttributeFiltersSelectionPayload {
    readonly filterLocalIds: string[];
}
export interface IChangeAttributeDisplayFormPayload {
    readonly filterLocalId: string;
    readonly displayForm: ObjRef;
    readonly supportsElementUris?: boolean;
}
export interface IUpdateConnectingAttributesOnFilterAddedPayload {
    addedFilterLocalId: string;
    connectingAttributes: IParentWithConnectingAttributes[];
}
export interface IChangeAttributeTitlePayload {
    readonly filterLocalId: string;
    readonly title?: string;
}
export interface IChangeAttributeSelectionModePayload {
    readonly filterLocalId: string;
    readonly selectionMode: DashboardAttributeFilterSelectionMode;
}
export declare const filterContextReducers: {
    setFilterContext: FilterContextReducer<{
        payload: SetFilterContextPayload;
        type: string;
    }>;
    updateFilterContextIdentity: FilterContextReducer<{
        payload: SetFilterContextIdentityPayload;
        type: string;
    }>;
    removeAttributeFilterDisplayForms: FilterContextReducer<{
        payload: ObjRef;
        type: string;
    }>;
    addAttributeFilterDisplayForm: FilterContextReducer<{
        payload: IAttributeDisplayFormMetadataObject;
        type: string;
    }>;
    addAttributeFilter: FilterContextReducer<{
        payload: IAddAttributeFilterPayload;
        type: string;
    }>;
    removeAttributeFilter: FilterContextReducer<{
        payload: IRemoveAttributeFilterPayload;
        type: string;
    }>;
    moveAttributeFilter: FilterContextReducer<{
        payload: IMoveAttributeFilterPayload;
        type: string;
    }>;
    updateAttributeFilterSelection: FilterContextReducer<{
        payload: IUpdateAttributeFilterSelectionPayload;
        type: string;
    }>;
    setAttributeFilterParents: FilterContextReducer<{
        payload: ISetAttributeFilterParentsPayload;
        type: string;
    }>;
    clearAttributeFiltersSelection: FilterContextReducer<{
        payload: IClearAttributeFiltersSelectionPayload;
        type: string;
    }>;
    upsertDateFilter: FilterContextReducer<{
        payload: IUpsertDateFilterPayload;
        type: string;
    }>;
    changeAttributeDisplayForm: FilterContextReducer<{
        payload: IChangeAttributeDisplayFormPayload;
        type: string;
    }>;
    changeAttributeTitle: FilterContextReducer<{
        payload: IChangeAttributeTitlePayload;
        type: string;
    }>;
    changeSelectionMode: FilterContextReducer<{
        payload: IChangeAttributeSelectionModePayload;
        type: string;
    }>;
};
export {};
