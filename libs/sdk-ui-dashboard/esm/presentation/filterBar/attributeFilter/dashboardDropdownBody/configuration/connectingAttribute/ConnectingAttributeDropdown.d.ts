import React from "react";
import { ObjRef } from "@gooddata/sdk-model";
import { IConnectingAttribute } from "../../../../../../model/index.js";
interface IConnectingAttributeDropdownProps {
    itemLocalId: string;
    selectedConnectingAttributeRef: ObjRef;
    connectingAttributes: IConnectingAttribute[];
    onSelect: (itemLocalId: string, targetRef: ObjRef) => void;
}
export declare const ConnectingAttributeDropdown: React.FC<IConnectingAttributeDropdownProps>;
export {};
