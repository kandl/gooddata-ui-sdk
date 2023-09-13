import { TotalType, IAttributeDescriptor } from "@gooddata/sdk-model";
import React from "react";
import { IntlShape } from "react-intl";
import { IColumnTotal } from "./aggregationsMenuTypes.js";
import { IMenuAggregationClickConfig } from "../../privateTypes.js";
export interface IAggregationsSubMenuProps {
    intl: IntlShape;
    totalType: TotalType;
    toggler: JSX.Element;
    isMenuOpened?: boolean;
    rowAttributeDescriptors: IAttributeDescriptor[];
    columnAttributeDescriptors: IAttributeDescriptor[];
    measureLocalIdentifiers: string[];
    columnTotals: IColumnTotal[];
    rowTotals: IColumnTotal[];
    showColumnsSubMenu: boolean;
    onAggregationSelect: (clickConfig: IMenuAggregationClickConfig) => void;
}
export default class AggregationsSubMenu extends React.Component<IAggregationsSubMenuProps> {
    static defaultProps: Pick<IAggregationsSubMenuProps, "isMenuOpened">;
    render(): JSX.Element;
}
//# sourceMappingURL=AggregationsSubMenu.d.ts.map