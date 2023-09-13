import { SagaIterator } from "redux-saga";
import { IDashboardAttributeFilter, ObjRef } from "@gooddata/sdk-model";
import { AddAttributeFilter } from "../../../commands/filters.js";
import { DashboardContext } from "../../../types/commonTypes.js";
export declare function addAttributeFilterHandler(ctx: DashboardContext, cmd: AddAttributeFilter): SagaIterator<void>;
export declare function getConnectingAttributes(ctx: DashboardContext, addedFilterAttribute: ObjRef, neighborFilter: IDashboardAttributeFilter): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CallEffect<ObjRef[]> | import("redux-saga/effects").AllEffect<import("redux-saga/effects").CallEffect<import("@gooddata/sdk-model").IAttributeMetadataObject>>, {
    filterLocalId: string;
    connectingAttributes: {
        title: string;
        ref: ObjRef;
    }[];
}, import("../../../../index.js").ObjRefMap<import("@gooddata/sdk-model").IAttributeDisplayFormMetadataObject> & ObjRef[] & import("@gooddata/sdk-model").IAttributeMetadataObject[]>;
