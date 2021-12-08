// (C) 2007-2021 GoodData Corporation
import React from "react";

import { MeasureValueFilter } from "@gooddata/sdk-ui-filters";
import { IMeasureValueFilter, measureLocalId, modifyAttribute, modifyMeasure } from "@gooddata/sdk-model";
import { PivotTable } from "@gooddata/sdk-ui-pivot";
import { Md } from "../../../md";

const FranchisedSalesAsPercent = modifyMeasure(Md.$FranchisedSales, (m) =>
    m.format("#,##0%").title("Franchise Sales").localId("franchiseSalesAsPercentage"),
);
const LocationName = modifyAttribute(Md.LocationName.Default, (a) => a.localId("LocationName"));

const measureTitle = "Franchised Sales Ratio";

const measures = [FranchisedSalesAsPercent];

const attributes = [LocationName];

const defaultFilter = {
    measureValueFilter: {
        measure: measures,
    },
};

export class MeasureValueFilterComponentPercentageExample extends React.PureComponent {
    public state = {
        filters: [],
    };

    public onApply = (filter: IMeasureValueFilter): void => {
        this.setState({ filters: [filter ?? defaultFilter] });
    };

    public render(): React.ReactNode {
        const { filters } = this.state;

        return (
            <React.Fragment>
                <MeasureValueFilter
                    onApply={this.onApply}
                    filter={filters[0]}
                    buttonTitle={measureTitle}
                    usePercentage
                    measureIdentifier={measureLocalId(FranchisedSalesAsPercent)}
                />
                <hr className="separator" />
                <div style={{ height: 300 }} className="s-pivot-table">
                    <PivotTable measures={measures} rows={attributes} filters={filters} />
                </div>
            </React.Fragment>
        );
    }
}

export default MeasureValueFilterComponentPercentageExample;
