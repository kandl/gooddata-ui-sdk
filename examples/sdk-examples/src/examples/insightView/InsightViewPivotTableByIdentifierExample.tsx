// (C) 2007-2021 GoodData Corporation
import React from "react";

import { InsightView } from "@gooddata/sdk-ui-ext";

import { Md } from "../../md";

const style = { height: 500 };
export const InsightViewPivotTableByIdentifierExample: React.FC = () => {
    return (
        <div style={style} className="s-insightView-pivot">
            <InsightView insight={Md.Insights.TableReportLaborCostsVsScheduledCosts} />
        </div>
    );
};
