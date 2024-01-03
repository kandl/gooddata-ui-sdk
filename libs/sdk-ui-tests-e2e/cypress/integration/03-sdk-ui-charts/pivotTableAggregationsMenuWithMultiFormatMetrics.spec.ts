// (C) 2023 GoodData Corporation
import * as Navigation from "../../tools/navigation.js";
import { Table } from "../../tools/table.js";
import { TotalTypes } from "../../tools/enum/TotalTypes.js";

describe("Pivot Table Aggregations menu", { tags: ["checklist_integrated_bear"] }, () => {
    beforeEach(() => {
        Navigation.visit(
            "visualizations/pivot-table/pivot-table-columns-aggregations-menu-one-subtotal-scenario",
        );
    });

    it("should apply column total correctly and render insight without errors", () => {
        const table = new Table(".gd-table-component");
        table.waitLoaded();

        const element = table.getMeasureCellHeader(0, 2);

        table.openAggregationMenu(element, TotalTypes.SUM);
        table.assertColumnTotal("within Forecast Category", true);

        table.hasCellValue(0, 6, "$8,091,764.99");
    });
});
