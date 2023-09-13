import React from "react";
import { ICatalogAttribute } from "@gooddata/sdk-model";
interface IAttributeListItemProps {
    item: ICatalogAttribute;
    isLocationIconEnabled: boolean;
    onClick: () => void;
}
declare const AttributeListItem: React.FC<IAttributeListItemProps>;
export default AttributeListItem;
