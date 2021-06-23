// (C) 2020 GoodData Corporation
import React, { useState } from "react";
import { InsightDrillDialog } from "../drill/DrillDialog/InsightDrillDialog";
import { DrillStep, DashboardDrillDefinition } from "../drill/interfaces";
import { DashboardInsightProps } from "./types";
import last from "lodash/last";
import { DefaultDashboardInsight } from "./DefaultDashboardInsight";
import { isDrillDownDefinition } from "@gooddata/sdk-ui-ext";
import { isDrillToInsight } from "@gooddata/sdk-backend-spi";

const isNextDrillStep = (drillDefinition: DashboardDrillDefinition) => {
    return isDrillDownDefinition(drillDefinition) || isDrillToInsight(drillDefinition);
};

/**
 * @internal
 */
export const DefaultDashboardInsightWithDrillDialog = (props: DashboardInsightProps): JSX.Element => {
    const [drillSteps, setDrillSteps] = useState<DrillStep[]>([]);
    const activeDrillStep = last(drillSteps);

    return (
        <>
            <DefaultDashboardInsight
                {...props}
                onDrillSelect={(drillStep) => {
                    if (isNextDrillStep(drillStep.drillDefinition)) {
                        setDrillSteps((s) => [...s, drillStep]);
                    }
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
                        if (isNextDrillStep(drillStep.drillDefinition)) {
                            setDrillSteps((s) => [...s, drillStep]);
                        }
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
