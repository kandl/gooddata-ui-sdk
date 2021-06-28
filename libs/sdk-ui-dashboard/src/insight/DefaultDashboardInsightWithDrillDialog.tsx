// (C) 2020 GoodData Corporation
import React, { useState } from "react";
import { InsightDrillDialog } from "../drill/DrillDialog/InsightDrillDialog";
import { DrillStep } from "../drill/interfaces";
import { DashboardInsightProps } from "./types";
import last from "lodash/last";
import { DefaultDashboardInsightWithDrillSelect } from "./DefaultDashboardInsightWithDrillSelect";

/**
 * @internal
 */
export const DefaultDashboardInsightWithDrillDialog = (props: DashboardInsightProps): JSX.Element => {
    const [drillSteps, setDrillSteps] = useState<DrillStep[]>([]);
    const activeDrillStep = last(drillSteps);

    return (
        <>
            <DefaultDashboardInsightWithDrillSelect
                {...props}
                onDrillDown={({ drillDefinition, drillEvent, insight }) => {
                    const drillStep: DrillStep = {
                        drillDefinition,
                        drillEvent,
                        insight,
                    };
                    setDrillSteps((s) => [...s, drillStep]);
                }}
                onDrillToInsight={({ drillDefinition, drillEvent, insight }) => {
                    const drillStep: DrillStep = {
                        drillDefinition,
                        drillEvent,
                        insight,
                    };
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
                    onDrillDown={({ drillDefinition, drillEvent, insight }) => {
                        const drillStep: DrillStep = {
                            drillDefinition,
                            drillEvent,
                            insight,
                        };
                        setDrillSteps((s) => [...s, drillStep]);
                    }}
                    onDrillToInsight={({ drillDefinition, drillEvent, insight }) => {
                        const drillStep: DrillStep = {
                            drillDefinition,
                            drillEvent,
                            insight,
                        };
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
