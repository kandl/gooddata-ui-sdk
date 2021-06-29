// (C) 2020-2021 GoodData Corporation
import React, { useEffect, useState } from "react";
import cx from "classnames";
import { v4 as uuid } from "uuid";
import { isDrillDownDefinition } from "@gooddata/sdk-ui-ext";
import { DrillSelectDropdown } from "./DrillSelectDropdown";
import {
    DashboardDrillDefinition,
    OnDashboardDrill,
    OnDrillDown,
    OnDrillToAttributeUrl,
    OnDrillToCustomUrl,
    OnDrillToDashboard,
    OnDrillToInsight,
} from "../interfaces";
import { DrillSelectContext } from "./interfaces";
import { IInsight } from "@gooddata/sdk-model";
import {
    isDrillToCustomUrl,
    isDrillToAttributeUrl,
    isDrillToDashboard,
    isDrillToInsight,
} from "@gooddata/sdk-backend-spi";
import { useDashboardSelector } from "../../model/state/dashboardStore";
import { useDrill } from "../hooks/useDrill";
import { IntlWrapper } from "../../localization/IntlWrapper";
import { selectLocale } from "../../model/state/config/configSelectors";
import { useDrillDown } from "../hooks/useDrillDown";
import { useDrillToInsight } from "../hooks/useDrillToInsight";
import { useDrillToDashboard } from "../hooks/useDrillToDashboard";
import { useDrillToAttributeUrl } from "../hooks/useDrillToAttributeUrl";
import { useDrillToCustomUrl } from "../hooks/useDrillToCustomUrl";
import { DashboardCommandFailed } from "../../model";

/**
 * @internal
 */
export type WithDrillSelectProps = {
    insight: IInsight;
    onDrillDown?: OnDrillDown;
    onDrillToInsight?: OnDrillToInsight;
    onDrillToDashboard?: OnDrillToDashboard;
    onDrillToAttributeUrl?: OnDrillToAttributeUrl;
    onDrillToCustomUrl?: OnDrillToCustomUrl;
    onError?: (error: any) => void;
    children: (props: { onDrill: OnDashboardDrill }) => JSX.Element;
};

export function WithDrillSelect({
    children,
    insight,
    onDrillDown,
    onDrillToInsight,
    onDrillToDashboard,
    onDrillToAttributeUrl,
    onDrillToCustomUrl,
    onError,
}: WithDrillSelectProps): JSX.Element {
    const [dropdownProps, setDropdownProps] = useState<DrillSelectContext | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [drillPickerId, setDrillPickerId] = useState<string | null>(null);
    const locale = useDashboardSelector(selectLocale);
    const handleError = (e: DashboardCommandFailed) => onError?.(e.payload.error);

    const drillDown = useDrillDown((s) => {
        onDrillDown?.({
            drillDefinition: s.payload.drillDefinition,
            drillEvent: s.payload.drillEvent,
            insight: s.payload.insight,
        });
    }, handleError);

    const drillToInsight = useDrillToInsight((s) => {
        onDrillToInsight?.({
            drillDefinition: s.payload.drillDefinition,
            drillEvent: s.payload.drillEvent,
            insight: s.payload.insight,
        });
    }, handleError);

    const drillToDashboard = useDrillToDashboard((s) => {
        onDrillToDashboard?.({
            drillDefinition: s.payload.drillDefinition,
            drillEvent: s.payload.drillEvent,
            filters: s.payload.filters,
        });
    }, handleError);

    const drillToAttributeUrl = useDrillToAttributeUrl((s) => {
        onDrillToAttributeUrl?.({
            drillDefinition: s.payload.drillDefinition,
            drillEvent: s.payload.drillEvent,
            url: s.payload.url,
        });
    }, handleError);

    const drillToCustomUrl = useDrillToCustomUrl((s) => {
        onDrillToCustomUrl?.({
            drillDefinition: s.payload.drillDefinition,
            drillEvent: s.payload.drillEvent,
            url: s.payload.url,
        });
    }, handleError);

    const drill = useDrill((s) => {
        setDropdownProps({
            drillDefinitions: s.payload.drillEvent.drillDefinitions!,
            drillEvent: s.payload.drillEvent,
            drillContext: s.payload.drillContext,
        });
        if (s.payload.drillEvent.drillDefinitions!.length === 1) {
            onSelect(s.payload.drillEvent.drillDefinitions![0]);
        } else {
            setIsOpen(true);
        }
    }, handleError);

    useEffect(() => {
        setDrillPickerId(uuid());
    }, []);

    const onClose = () => {
        setIsOpen(false);
    };

    const onSelect = (drillDefinition: DashboardDrillDefinition) => {
        if (dropdownProps) {
            const { drillEvent } = dropdownProps;
            if (isDrillDownDefinition(drillDefinition)) {
                drillDown.run(insight, drillDefinition, drillEvent);
            } else if (isDrillToInsight(drillDefinition)) {
                drillToInsight.run(drillDefinition, drillEvent);
            } else if (isDrillToDashboard(drillDefinition)) {
                drillToDashboard.run(drillDefinition, drillEvent);
            } else if (isDrillToAttributeUrl(drillDefinition)) {
                drillToAttributeUrl.run(drillDefinition, drillEvent);
            } else if (isDrillToCustomUrl(drillDefinition)) {
                drillToCustomUrl.run(drillDefinition, drillEvent);
            }
            setDropdownProps(null);
            setIsOpen(false);
        }
    };

    const dropDownAnchorClass = `s-drill-picker-${drillPickerId}`;

    const drillDownDropdown = dropdownProps ? (
        <IntlWrapper locale={locale}>
            <DrillSelectDropdown
                {...dropdownProps}
                dropDownAnchorClass={dropDownAnchorClass}
                isOpen={isOpen}
                onClose={onClose}
                onSelect={onSelect}
            />
        </IntlWrapper>
    ) : null;

    return (
        <div className={cx("gd-drill-modal-wrapper-mask", dropDownAnchorClass)}>
            {children({ onDrill: drill.run })}
            {drillDownDropdown}
        </div>
    );
}
