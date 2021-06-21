// (C) 2020 GoodData Corporation
import React, { useState } from "react";
import { InsightDrillDialog } from "../drill/DrillDialog/InsightDrillDialog";
import { DrillStep } from "../drill/Types";
import { DashboardInsightProps } from "./types";
import last from "lodash/last";
import { DefaultDashboardInsight } from "./DefaultDashboardInsight";

/**
 * @internal
 */
export const InsightWithDrillSelect = (props: DashboardInsightProps): JSX.Element => {
    const [drillSteps, setDrillSteps] = useState<DrillStep[]>([]);
    const activeDrillStep = last(drillSteps);

    console.log("activeDrillStep", activeDrillStep);
    return (
        <>
            <DefaultDashboardInsight
                {...props}
                onDrillSelect={(drillStep) => {
                    console.log("on drill select 1", { drillStep });
                    setDrillSteps((s) => [...s, drillStep]);
                }}
                onDrill={(drillEvent, drillContext) => {
                    props.onDrill?.(drillEvent, drillContext);
                }}
            />
            {activeDrillStep && (
                <InsightDrillDialog
                    activeDrillStep={activeDrillStep}
                    drillSteps={drillSteps}
                    onDrillSelect={(drillStep) => {
                        console.log("on drill select 2", { drillStep });
                        setDrillSteps((s) => [...s, drillStep]);
                    }}
                    onDrill={(drillEvent, drillContext) => {
                        props.onDrill?.(drillEvent, drillContext);
                    }}
                    onBackButtonClick={() => setDrillSteps(([firstDrill]) => [firstDrill])}
                    onClose={() => setDrillSteps([])}
                />
            )}
        </>
    );
};
