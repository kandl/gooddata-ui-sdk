import React from "react";
import { IAttributeMetadataObject, ObjRef } from "@gooddata/sdk-model";
import { IDashboardAttributeFilterParentItem, IConnectingAttribute } from "../../../../../../model/index.js";
interface IConfigurationParentItemsProps {
    currentFilterLocalId: string;
    parents: IDashboardAttributeFilterParentItem[];
    setParents: (localId: string, isSelected: boolean, overAttributes: ObjRef[]) => void;
    onConnectingAttributeChanged: (localId: string, selectedAttribute: ObjRef) => void;
    connectingAttributes: IConnectingAttribute[][];
    attributes: IAttributeMetadataObject[];
    disabled: boolean;
    disabledTooltip: string;
}
export declare const ParentFiltersList: React.FC<IConfigurationParentItemsProps>;
export {};
