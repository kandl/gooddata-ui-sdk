// (C) 2007-2019 GoodData Corporation
import { ReferenceMd } from "@gooddata/reference-workspace";
import { newAttributeSort, newPositiveAttributeFilter, newNegativeAttributeFilter, newTotal, } from "@gooddata/sdk-model";
import { PivotTable } from "@gooddata/sdk-ui-pivot";
import { requestPages } from "@gooddata/mock-handling";
import { scenariosFor } from "../../src/index.js";
import { PivotTableWighSingleMeasureAndSingleRowColAttr, PivotTableWithSingleMeasureAndTwoRowsAndCols, PivotTableWithTwoMeasuresAndTwoRowsAndCols, PivotTableWighTwoMeasureAndSingleRowColAttr, getCommonPivotTableSizingConfig, } from "./base.js";
export const PivotTableWithTwoMeasuresAndTotals = {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Product.Name),
        newTotal("sum", ReferenceMd.Won, ReferenceMd.Product.Name),
    ],
    config: getCommonPivotTableSizingConfig([ReferenceMd.Product.Name]),
};
export const PivotTableWithTwoMeasuresGrandTotalsAndSubtotals = {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Product.Name),
        newTotal("min", ReferenceMd.Amount, ReferenceMd.Product.Name),
        newTotal("max", ReferenceMd.Won, ReferenceMd.Product.Name),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.Product.Name),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Department),
        newTotal("med", ReferenceMd.Amount, ReferenceMd.Department),
        newTotal("med", ReferenceMd.Won, ReferenceMd.Department),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.Department),
    ],
    config: getCommonPivotTableSizingConfig([ReferenceMd.Product.Name, ReferenceMd.Department]),
};
export const PivotTableWithTwoMeasuresColumnGrandTotalsAndSubtotals = {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("min", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("max", ReferenceMd.Won, ReferenceMd.ForecastCategory),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.ForecastCategory),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Region),
        newTotal("med", ReferenceMd.Amount, ReferenceMd.Region),
        newTotal("med", ReferenceMd.Won, ReferenceMd.Region),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.Region),
    ],
    config: getCommonPivotTableSizingConfig(),
};
export const PivotTableWithTwoMeasuresRowColumnGrandTotalsAndSubtotals = {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Product.Name),
        newTotal("min", ReferenceMd.Amount, ReferenceMd.Product.Name),
        newTotal("max", ReferenceMd.Won, ReferenceMd.Product.Name),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.Product.Name),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Department),
        newTotal("med", ReferenceMd.Amount, ReferenceMd.Department),
        newTotal("med", ReferenceMd.Won, ReferenceMd.Department),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.Department),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("min", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("max", ReferenceMd.Won, ReferenceMd.ForecastCategory),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.ForecastCategory),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Region),
        newTotal("med", ReferenceMd.Amount, ReferenceMd.Region),
        newTotal("med", ReferenceMd.Won, ReferenceMd.Region),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.Region),
    ],
    config: getCommonPivotTableSizingConfig(),
};
export const PivotTableWithSingleMeasureAndGrandTotal = {
    ...PivotTableWithSingleMeasureAndTwoRowsAndCols,
    totals: [newTotal("sum", ReferenceMd.Amount, ReferenceMd.Product.Name)],
    config: getCommonPivotTableSizingConfig(),
};
export const PivotTableWithSingleMeasureAndColumnGrandTotal = {
    ...PivotTableWighSingleMeasureAndSingleRowColAttr,
    totals: [newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory)],
    config: getCommonPivotTableSizingConfig(),
};
export const PivotTableWithSingleMeasureAndRowColumnGrandTotal = {
    ...PivotTableWighSingleMeasureAndSingleRowColAttr,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.SalesRep.Owner),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
    ],
    config: getCommonPivotTableSizingConfig(),
};
const totalsForRows = scenariosFor("PivotTable", PivotTable)
    .withGroupNames("totals", "rows")
    .withVisualTestConfig({ screenshotSize: { width: 1000, height: 600 } })
    .addScenario("single measure and single grand total", PivotTableWithSingleMeasureAndGrandTotal)
    .addScenario("single measure and multiple grand totals", {
    ...PivotTableWithSingleMeasureAndTwoRowsAndCols,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Product.Name),
        newTotal("min", ReferenceMd.Amount, ReferenceMd.Product.Name),
        newTotal("max", ReferenceMd.Amount, ReferenceMd.Product.Name),
        newTotal("nat", ReferenceMd.Amount, ReferenceMd.Product.Name),
    ],
})
    .addScenario("two measures and single grand total for one", {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [newTotal("sum", ReferenceMd.Amount, ReferenceMd.Product.Name)],
}, (m) => m.withCustomDataCapture({ windows: requestPages([0, 0], [22, 1000], 1) }))
    .addScenario("two measures and single grand total for each", PivotTableWithTwoMeasuresAndTotals, (m) => m.withCustomDataCapture({ windows: requestPages([0, 0], [22, 1000], 1) }))
    .addScenario("two measures and multiple grand totals for each", {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Product.Name),
        newTotal("min", ReferenceMd.Amount, ReferenceMd.Product.Name),
        newTotal("max", ReferenceMd.Won, ReferenceMd.Product.Name),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.Product.Name),
    ],
})
    .addScenario("two measures and one subtotal", {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [newTotal("sum", ReferenceMd.Amount, ReferenceMd.Department)],
}, (m) => m.withCustomDataCapture({ windows: requestPages([0, 0], [22, 1000], 1) }))
    .addScenario("two measures and multiple subtotals", {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Department),
        newTotal("med", ReferenceMd.Amount, ReferenceMd.Department),
        newTotal("med", ReferenceMd.Won, ReferenceMd.Department),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.Department),
    ],
})
    .addScenario("two measures and grand totals and multiple subtotals", {
    ...PivotTableWithTwoMeasuresGrandTotalsAndSubtotals,
})
    .addScenario("two measures and single grand total sorted by second attribute", {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [newTotal("sum", ReferenceMd.Amount, ReferenceMd.Product.Name)],
    sortBy: [newAttributeSort(ReferenceMd.Department, "desc")],
}, (m) => m.withCustomDataCapture({
    windows: [...requestPages([0, 0], [22, 1000], 1), ...requestPages([0, 0], [12, 1000], 1)],
}))
    .addScenario("two measures and single grand total and single subtotal sorted by second attribute", 
// The expected behaviour is that the subtotal will be removed and the scenario will be reduced to
// the scenario "two measures and single grand total sorted by second attribute"
// The requested windows also get affected so the base scenario requires multiple recorded responses
{
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Product.Name),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Department),
    ],
    sortBy: [newAttributeSort(ReferenceMd.Department, "desc")],
});
const totalsForColumns = scenariosFor("PivotTable", PivotTable)
    .withGroupNames("totals", "columns")
    .withVisualTestConfig({ screenshotSize: { width: 1000, height: 600 } })
    .addScenario("single measure and single column grand total", {
    ...PivotTableWithSingleMeasureAndColumnGrandTotal,
    config: getCommonPivotTableSizingConfig([ReferenceMd.SalesRep.Owner]),
})
    .addScenario("single measure and multiple column grand totals", {
    ...PivotTableWighSingleMeasureAndSingleRowColAttr,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("min", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("max", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("nat", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
    ],
    config: getCommonPivotTableSizingConfig(),
})
    .addScenario("two measures and single column grand total for one", {
    ...PivotTableWighTwoMeasureAndSingleRowColAttr,
    totals: [newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory)],
    filters: [newNegativeAttributeFilter(ReferenceMd.ForecastCategory, ["Include"])],
    config: getCommonPivotTableSizingConfig(),
})
    .addScenario("two measures and single column grand total for each", {
    ...PivotTableWighTwoMeasureAndSingleRowColAttr,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("max", ReferenceMd.Probability, ReferenceMd.ForecastCategory),
    ],
    config: getCommonPivotTableSizingConfig(),
})
    .addScenario("two measures and multiple column grand totals for each", {
    ...PivotTableWighTwoMeasureAndSingleRowColAttr,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("min", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("max", ReferenceMd.Probability, ReferenceMd.ForecastCategory),
        newTotal("nat", ReferenceMd.Probability, ReferenceMd.ForecastCategory),
    ],
    config: getCommonPivotTableSizingConfig([ReferenceMd.SalesRep.Owner]),
})
    .addScenario("two measures and one column subtotal", {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [newTotal("sum", ReferenceMd.Amount, ReferenceMd.Region)],
    config: getCommonPivotTableSizingConfig([ReferenceMd.Product.Name, ReferenceMd.Department]),
})
    .addScenario("two measures and multiple column subtotals", {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Region),
        newTotal("med", ReferenceMd.Amount, ReferenceMd.Region),
        newTotal("med", ReferenceMd.Won, ReferenceMd.Region),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.Region),
    ],
    filters: [newPositiveAttributeFilter(ReferenceMd.Region, ["West Coast"])],
    config: getCommonPivotTableSizingConfig([ReferenceMd.Product.Name, ReferenceMd.Department]),
})
    .addScenario("two measures and column grand totals and multiple subtotals", {
    ...PivotTableWithTwoMeasuresColumnGrandTotalsAndSubtotals,
    filters: [newPositiveAttributeFilter(ReferenceMd.Region, ["West Coast"])],
    config: getCommonPivotTableSizingConfig([ReferenceMd.Product.Name, ReferenceMd.Department]),
})
    .addScenario("two measures and column single grand total sorted by second attribute", {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory)],
    sortBy: [newAttributeSort(ReferenceMd.Department, "desc")],
    filters: [newPositiveAttributeFilter(ReferenceMd.Region, ["West Coast"])],
    config: getCommonPivotTableSizingConfig([ReferenceMd.Product.Name, ReferenceMd.Department]),
})
    .addScenario("two measures and single column grand total and single subtotal sorted by second attribute", 
// The expected behaviour is that the subtotal will be removed and the scenario will be reduced to
// the scenario "two measures and single grand total sorted by second attribute"
// The requested windows also get affected so the base scenario requires multiple recorded responses
{
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Region),
    ],
    sortBy: [newAttributeSort(ReferenceMd.Department, "desc")],
    filters: [newPositiveAttributeFilter(ReferenceMd.Region, ["West Coast"])],
    config: getCommonPivotTableSizingConfig([ReferenceMd.Product.Name, ReferenceMd.Department]),
});
const totalsForRowsAndColumns = scenariosFor("PivotTable", PivotTable)
    .withGroupNames("totals", "rows & columns")
    .withVisualTestConfig({ screenshotSize: { width: 1000, height: 600 } })
    .addScenario("single measure and single column/row grand total", PivotTableWithSingleMeasureAndRowColumnGrandTotal)
    .addScenario("single measure and multiple column/row grand totals", {
    ...PivotTableWighSingleMeasureAndSingleRowColAttr,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.SalesRep.Owner),
        newTotal("min", ReferenceMd.Amount, ReferenceMd.SalesRep.Owner),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("min", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
    ],
    config: getCommonPivotTableSizingConfig(),
})
    .addScenario("two measures and single column/row grand total for one", {
    ...PivotTableWighTwoMeasureAndSingleRowColAttr,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.SalesRep.Owner),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
    ],
    config: getCommonPivotTableSizingConfig(),
})
    .addScenario("two measures and single column/row grand total for each", {
    ...PivotTableWighTwoMeasureAndSingleRowColAttr,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.SalesRep.Owner),
        newTotal("max", ReferenceMd.Probability, ReferenceMd.SalesRep.Owner),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("max", ReferenceMd.Probability, ReferenceMd.ForecastCategory),
    ],
    config: getCommonPivotTableSizingConfig(),
})
    .addScenario("two measures and multiple column/row grand totals for each", {
    ...PivotTableWighTwoMeasureAndSingleRowColAttr,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.SalesRep.Owner),
        newTotal("min", ReferenceMd.Amount, ReferenceMd.SalesRep.Owner),
        newTotal("max", ReferenceMd.Probability, ReferenceMd.SalesRep.Owner),
        newTotal("nat", ReferenceMd.Probability, ReferenceMd.SalesRep.Owner),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("min", ReferenceMd.Amount, ReferenceMd.ForecastCategory),
        newTotal("max", ReferenceMd.Probability, ReferenceMd.ForecastCategory),
        newTotal("nat", ReferenceMd.Probability, ReferenceMd.ForecastCategory),
    ],
    config: getCommonPivotTableSizingConfig([ReferenceMd.SalesRep.Owner]),
})
    .addScenario("two measures and one column/row subtotal", {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Department),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Region),
    ],
    config: getCommonPivotTableSizingConfig([ReferenceMd.Product.Name, ReferenceMd.Department]),
})
    .addScenario("two measures and multiple column/row subtotals", {
    ...PivotTableWithTwoMeasuresAndTwoRowsAndCols,
    totals: [
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Department),
        newTotal("med", ReferenceMd.Amount, ReferenceMd.Department),
        newTotal("med", ReferenceMd.Won, ReferenceMd.Department),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.Department),
        newTotal("sum", ReferenceMd.Amount, ReferenceMd.Region),
        newTotal("med", ReferenceMd.Amount, ReferenceMd.Region),
        newTotal("med", ReferenceMd.Won, ReferenceMd.Region),
        newTotal("nat", ReferenceMd.Won, ReferenceMd.Region),
    ],
    config: getCommonPivotTableSizingConfig([ReferenceMd.Product.Name, ReferenceMd.Department]),
})
    .addScenario("two measures and column/row grand totals and multiple subtotals", {
    ...PivotTableWithTwoMeasuresRowColumnGrandTotalsAndSubtotals,
    config: getCommonPivotTableSizingConfig([ReferenceMd.Product.Name, ReferenceMd.Department]),
});
export default [totalsForRows, totalsForColumns, totalsForRowsAndColumns];
//# sourceMappingURL=totals.js.map