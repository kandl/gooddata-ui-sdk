// (C) 2022 GoodData Corporation
import * as Navigation from "../../tools/navigation.js";
import { Table } from "../../tools/table.js";

const CELL_AUTO_RESIZE_WIDTH = 105;

describe("should autoresized all columns", { tags: ["pre-merge_isolated_bear"] }, () => {
    beforeEach(() => {
        Navigation.visit("visualizations/pivot-table/sizing/pivot-table-sizing");
    });

    it("should be autoresized all columns", () => {
        const table = new Table(".s-pivot-table-sizing");
        table.waitLoaded();
        table.hasCellWidth(0, 0, CELL_AUTO_RESIZE_WIDTH, true);
        //need to scroll AG columns are virtualized
        table.scrollTo("right");
        table.hasCellWidth(0, 9, CELL_AUTO_RESIZE_WIDTH, true);
    });
});
