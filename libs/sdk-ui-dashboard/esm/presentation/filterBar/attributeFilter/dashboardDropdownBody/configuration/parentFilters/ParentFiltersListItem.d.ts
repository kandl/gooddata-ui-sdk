import React from "react";
import { ObjRef } from "@gooddata/sdk-model";
import { IDashboardAttributeFilterParentItem, IConnectingAttribute } from "../../../../../../model/index.js";
export interface IConfigurationParentItem {
    localId: string;
    displayForm: ObjRef;
    isSelected: boolean;
}
export interface IConfigurationParentItemProps {
    currentFilterLocalId: string;
    item: IDashboardAttributeFilterParentItem;
    onClick: (localId: string, isSelected: boolean, overAttributes: ObjRef[]) => void;
    onConnectingAttributeSelect: (localIdentifier: string, targetRef: ObjRef) => void;
    connectingAttributes: IConnectingAttribute[];
    title: string;
    disabled: boolean;
}
export declare const ParentFiltersListItem: React.FC<IConfigurationParentItemProps>;
