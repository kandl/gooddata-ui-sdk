// (C) 2023 GoodData Corporation
import React from "react";
import { Dashboard } from "@gooddata/sdk-ui-dashboard";
import { idRef } from "@gooddata/sdk-model";
import * as TigerMDObjects from "../../../../../reference_workspace/workspace_objects/goodsales/current_reference_workspace_objects_tiger.js";
import * as BearMDObjects from "../../../../../reference_workspace/workspace_objects/goodsales/current_reference_workspace_objects_bear.js";

type MDObjectsType = typeof TigerMDObjects & typeof BearMDObjects;

export const MDObject = (
    process.env.SDK_BACKEND === "TIGER" ? TigerMDObjects : BearMDObjects
) as MDObjectsType;

export const DashboardShortenMetricNameScenario: React.FC = () => {
    return <Dashboard dashboard={idRef(MDObject.Dashboards.KDUsingLongNameMetric)} />;
};
