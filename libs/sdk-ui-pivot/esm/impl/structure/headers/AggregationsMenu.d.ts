import React from "react";
import { IntlShape } from "react-intl";
import { IExecutionDefinition, ITotal, TotalType, ITheme } from "@gooddata/sdk-model";
import { IOnOpenedChangeParams } from "@gooddata/sdk-ui-kit";
import { TableDescriptor } from "../tableDescriptor.js";
import { IMenuAggregationClickConfig } from "../../privateTypes.js";
export interface IAggregationsMenuProps {
    intl: IntlShape;
    isMenuOpened: boolean;
    isMenuButtonVisible: boolean;
    showSubmenu: boolean;
    showColumnsSubMenu: boolean;
    availableTotalTypes: TotalType[];
    colId: string;
    getTableDescriptor: () => TableDescriptor;
    getExecutionDefinition: () => IExecutionDefinition;
    getColumnTotals?: () => ITotal[];
    getRowTotals?: () => ITotal[];
    onAggregationSelect: (clickConfig: IMenuAggregationClickConfig) => void;
    onMenuOpenedChange: ({ opened, source }: IOnOpenedChangeParams) => void;
    theme?: ITheme;
}
export default class AggregationsMenu extends React.Component<IAggregationsMenuProps> {
    render(): JSX.Element | null;
    private getColumnTotals;
    private getRowTotals;
    private getTogglerClassNames;
    private renderMenuItemContent;
    private getItemClassNames;
    private isTableFilteredByMeasureValue;
    private isTableFilteredByRankingFilter;
    private renderMainMenuItems;
}
//# sourceMappingURL=AggregationsMenu.d.ts.map