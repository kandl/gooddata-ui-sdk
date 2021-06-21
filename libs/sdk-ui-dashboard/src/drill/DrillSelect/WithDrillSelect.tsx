// (C) 2020-2021 GoodData Corporation
import React, { useEffect, useState } from "react";
import cx from "classnames";
import { v4 as uuid } from "uuid";
import { isDrillDownDefinition } from "@gooddata/sdk-ui-ext";
import { DrillSelectDropdown } from "./DrillSelectDropdown";
import { DashboardDrillDefinition, DrillStep, OnDashboardDrill } from "../Types";
import { filterDrillsByDrillEvent } from "../utils/DrillService";
import { DrillSelectContext } from "./interfaces";
import { IInsight, insightRef, areObjRefsEqual } from "@gooddata/sdk-model";
import { isDrillToInsight } from "@gooddata/sdk-backend-spi";
import { useDashboardSelector } from "../../model/state/dashboardStore";
import { selectInsights } from "../../model/state/insights/insightsSelectors";
import { addIntersectionFiltersToInsight } from "@gooddata/sdk-ui-ext/esm/internal/components/pluggableVisualizations/drillDownUtil";

/**
 * @internal
 */
export type WithDrillSelectProps = {
    onDrillSelect?: (drillStep: DrillStep) => void;
    children: (props: { handleDrillSelect: OnDashboardDrill }) => JSX.Element;
};

export function WithDrillSelect({ children, onDrillSelect }: WithDrillSelectProps): JSX.Element {
    const [dropdownProps, setDropdownProps] = useState<DrillSelectContext | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [drillPickerId, setDrillPickerId] = useState<string | null>(null);
    const insights = useDashboardSelector(selectInsights);

    useEffect(() => {
        setDrillPickerId(uuid());
    }, []);

    const handleDrillSelect: OnDashboardDrill = (drillEvent, drillContext) => {
        const drillDefinitionsForEvent = filterDrillsByDrillEvent(
            drillEvent.drillDefinitions ?? [],
            drillEvent,
        );

        if (drillDefinitionsForEvent.length > 1) {
            setDropdownProps({ drillDefinitions: drillDefinitionsForEvent, drillEvent, drillContext });
            setIsOpen(true);
            return;
        }

        if (drillDefinitionsForEvent.length === 1) {
            setDropdownProps(null);
            setIsOpen(false);
            let insightWithDrillsApplied: IInsight = drillContext.insight!;
            const [drillDefinition] = drillDefinitionsForEvent;

            if (isDrillDownDefinition(drillDefinition)) {
                insightWithDrillsApplied = drillContext.getInsightWithDrillDownApplied(
                    drillContext.insight!,
                    {
                        drillDefinition,
                        event: drillEvent,
                    },
                );
            } else if (isDrillToInsight(drillDefinition)) {
                insightWithDrillsApplied = insights.find((i) =>
                    areObjRefsEqual(drillDefinition.target, insightRef(i)),
                )!;
                insightWithDrillsApplied = addIntersectionFiltersToInsight(
                    insightWithDrillsApplied!,
                    drillEvent.drillContext.intersection!,
                );
            }

            onDrillSelect?.({
                drillEvent,
                insight: insightWithDrillsApplied,
                drillDefinition: drillDefinitionsForEvent[0],
            });
        }
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const onSelect = (drillDefinition: DashboardDrillDefinition) => {
        if (dropdownProps) {
            const { drillEvent, drillContext } = dropdownProps;
            setIsOpen(false);
            let insightWithDrillsApplied: IInsight = drillContext!.insight!;

            if (isDrillDownDefinition(drillDefinition)) {
                insightWithDrillsApplied = drillContext!.getInsightWithDrillDownApplied(
                    drillContext!.insight!,
                    {
                        drillDefinition,
                        event: drillEvent,
                    },
                );
            } else if (isDrillToInsight(drillDefinition)) {
                insightWithDrillsApplied = insights.find((i) =>
                    areObjRefsEqual(drillDefinition.target, insightRef(i)),
                )!;
                insightWithDrillsApplied = addIntersectionFiltersToInsight(
                    insightWithDrillsApplied!,
                    drillEvent.drillContext.intersection!,
                );
            }
            setDropdownProps(null);
            onDrillSelect?.({
                drillEvent,
                insight: insightWithDrillsApplied,
                drillDefinition,
            });
        }
    };

    const dropDownAnchorClass = `s-drill-picker-${drillPickerId}`;

    const drillDownDropdown = dropdownProps ? (
        <DrillSelectDropdown
            {...dropdownProps}
            dropDownAnchorClass={dropDownAnchorClass}
            isOpen={isOpen}
            onClose={onClose}
            onSelect={onSelect}
        />
    ) : null;

    return (
        <div className={cx("gd-drill-modal-wrapper-mask", dropDownAnchorClass)}>
            {children({ handleDrillSelect })}
            {drillDownDropdown}
        </div>
    );
}
