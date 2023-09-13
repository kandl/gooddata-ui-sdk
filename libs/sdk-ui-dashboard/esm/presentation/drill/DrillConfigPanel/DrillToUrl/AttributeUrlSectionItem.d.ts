import React from "react";
import { IAttributeWithDisplayForm } from "./types.js";
export interface IAttributeUrlSectionItemProps {
    item: IAttributeWithDisplayForm;
    isSelected: boolean;
    onClickHandler?: (item: IAttributeWithDisplayForm) => void;
}
export declare const AttributeUrlSectionItem: React.FC<IAttributeUrlSectionItemProps>;
