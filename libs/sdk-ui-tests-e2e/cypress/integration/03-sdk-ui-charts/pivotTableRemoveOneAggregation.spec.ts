// (C) 2022 GoodData Corporation
import * as Navigation from "../../tools/navigation.js";
import { Table } from "../../tools/table.js";
import { TotalTypes } from "../../tools/enum/TotalTypes.js";

describe("Pivot Table Aggregations remove one row totals", () => {
    beforeEach(() => {
        Navigation.visit("visualizations/pivot-table/pivot-table-one-total-aggregations-menu");
    });

    it("(SEPARATE) should remove row totals for one measure", { tags: ["pre-merge_isolated_bear"] }, () => {
        const table = new Table(".s-pivot-table-aggregations-menu");
        table.waitLoaded();

        const element = table.getMeasureCellHeader(0, 2);
        table.addOrRemoveRowTotal(element, TotalTypes.SUM);

        table.waitRowColumnLoaded().waitLoaded();

        table.existPivotTableFooterRow(0, false);
    });
});
