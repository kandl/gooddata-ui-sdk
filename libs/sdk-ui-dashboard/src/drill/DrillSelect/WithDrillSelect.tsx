// (C) 2020-2021 GoodData Corporation
import React, { useEffect, useState } from "react";
import cx from "classnames";
import { v4 as uuid } from "uuid";
import { IDashboardDrillEvent, IDrillDownDefinition, isDrillDownDefinition } from "@gooddata/sdk-ui-ext";
import { DrillSelectDropdown } from "./DrillSelectDropdown";
import { DashboardDrillDefinition, OnDashboardDrill } from "../interfaces";
import { DrillSelectContext } from "./interfaces";
import { IFilter, IInsight } from "@gooddata/sdk-model";
import {
    IDrillToDashboard,
    IDrillToInsight,
    IDrillToAttributeUrl,
    IDrillToCustomUrl,
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

/**
 * @internal
 */
export type WithDrillSelectProps = {
    insight: IInsight;
    onDrillToInsight?: (context: {
        drillDefinition: IDrillToInsight;
        drillEvent: IDashboardDrillEvent;
        insight: IInsight;
    }) => void;
    //
    onDrillDown?: (context: {
        drillDefinition: IDrillDownDefinition;
        drillEvent: IDashboardDrillEvent;
        insight: IInsight;
    }) => void;
    //
    onDrillToDashboard?: (context: {
        drillDefinition: IDrillToDashboard;
        drillEvent: IDashboardDrillEvent;
        filters: IFilter[];
    }) => void;
    //
    onDrillToAttributeUrl?: (context: {
        drillDefinition: IDrillToAttributeUrl;
        drillEvent: IDashboardDrillEvent;
        url: string;
    }) => void;
    //
    onDrillToCustomUrl?: (context: {
        drillDefinition: IDrillToCustomUrl;
        drillEvent: IDashboardDrillEvent;
        url: string;
    }) => void;
    children: (props: { performDrill: OnDashboardDrill }) => JSX.Element;
};

export function WithDrillSelect({
    children,
    insight,
    onDrillDown,
    onDrillToInsight,
    onDrillToDashboard,
    onDrillToAttributeUrl,
    onDrillToCustomUrl,
}: WithDrillSelectProps): JSX.Element {
    const [dropdownProps, setDropdownProps] = useState<DrillSelectContext | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [drillPickerId, setDrillPickerId] = useState<string | null>(null);
    const locale = useDashboardSelector(selectLocale);

    const { run: performDrillDown } = useDrillDown(
        (s) => {
            onDrillDown?.({
                drillDefinition: s.payload.drillDefinition,
                drillEvent: s.payload.drillEvent,
                insight: s.payload.insight,
            });
        },
        (_e) => {},
    );

    const { run: performDrillToInsight } = useDrillToInsight(
        (s) => {
            onDrillToInsight?.({
                drillDefinition: s.payload.drillDefinition,
                drillEvent: s.payload.drillEvent,
                insight: s.payload.insight,
            });
        },
        (_e) => {},
    );

    const { run: performDrillToDashboard } = useDrillToDashboard(
        (s) => {
            onDrillToDashboard?.({
                drillDefinition: s.payload.drillDefinition,
                drillEvent: s.payload.drillEvent,
                filters: s.payload.filters,
            });
        },
        (_e) => {},
    );

    const { run: performDrillToAttributeUrl } = useDrillToAttributeUrl(
        (s) => {
            onDrillToAttributeUrl?.({
                drillDefinition: s.payload.drillDefinition,
                drillEvent: s.payload.drillEvent,
                url: s.payload.url,
            });
        },
        (_e) => {},
    );

    const { run: performDrillToCustomUrl } = useDrillToCustomUrl(
        (s) => {
            onDrillToCustomUrl?.({
                drillDefinition: s.payload.drillDefinition,
                drillEvent: s.payload.drillEvent,
                url: s.payload.url,
            });
        },
        (_e) => {},
    );

    const { run: performDrill } = useDrill(
        (s) => {
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
        },
        (_e) => {},
    );

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
                performDrillDown(insight, drillDefinition, drillEvent);
            } else if (isDrillToInsight(drillDefinition)) {
                performDrillToInsight(drillDefinition, drillEvent);
            } else if (isDrillToDashboard(drillDefinition)) {
                performDrillToDashboard(drillDefinition, drillEvent);
            } else if (isDrillToAttributeUrl(drillDefinition)) {
                performDrillToAttributeUrl(drillDefinition, drillEvent);
            } else if (isDrillToCustomUrl(drillDefinition)) {
                performDrillToCustomUrl(drillDefinition, drillEvent);
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
            {children({ performDrill })}
            {drillDownDropdown}
        </div>
    );
}
