import React from "react";
import { IntlShape } from "react-intl";
import { IAttributeDescriptor, TotalType } from "@gooddata/sdk-model";
import { IColumnTotal } from "./aggregationsMenuTypes.js";
import { IMenuAggregationClickConfig } from "../../privateTypes.js";
interface IAggregationsSubMenuItemsProps {
    intl: IntlShape;
    attributeDescriptors: IAttributeDescriptor[];
    totalType: TotalType;
    measureLocalIdentifiers: string[];
    totals: IColumnTotal[];
    isColumn: boolean;
    icon: JSX.Element;
    headerText: string;
    onAggregationSelect: (clickConfig: IMenuAggregationClickConfig) => void;
}
export declare const AggregationsSubMenuItems: React.FC<IAggregationsSubMenuItemsProps>;
export {};
//# sourceMappingURL=AggregationsSubMenuItems.d.ts.map