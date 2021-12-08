// (C) 2007-2021 GoodData Corporation
import React from "react";
import { BarChart } from "@gooddata/sdk-ui-charts";
import { modifyMeasure, newAbsoluteDateFilter } from "@gooddata/sdk-model";

import { ExampleWithExport } from "./ExampleWithExport";
import { Md } from "../../md";

const TotalSales = modifyMeasure(Md.$TotalSales, (m) => m.format("#,##0").alias("$ Total Sales"));

const measures = [TotalSales];
const filters = [newAbsoluteDateFilter(Md.DateDatasets.Date.ref, "2017-01-01", "2017-12-31")];

const style = { height: 300 };

export const BarChartExportExample: React.FC = () => {
    return (
        <ExampleWithExport filters={filters}>
            {(onExportReady) => (
                <div style={style} className="s-bar-chart">
                    <BarChart
                        measures={measures}
                        viewBy={Md.LocationResort}
                        filters={filters}
                        onExportReady={onExportReady}
                    />
                </div>
            )}
        </ExampleWithExport>
    );
};
