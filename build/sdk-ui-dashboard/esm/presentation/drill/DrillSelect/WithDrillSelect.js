// (C) 2020-2022 GoodData Corporation
import React, { useState, useCallback, useRef } from "react";
import cx from "classnames";
import { v4 as uuid } from "uuid";
import { DrillSelectDropdown } from "./DrillSelectDropdown.js";
import { isDrillToAttributeUrl, isDrillToCustomUrl, isDrillToDashboard, isDrillToInsight, } from "@gooddata/sdk-model";
import { IntlWrapper } from "../../localization/index.js";
import { selectLocale, useDashboardSelector, selectDisableDefaultDrills, selectWidgetDrills, } from "../../../model/index.js";
import { isDrillDownDefinition, } from "../../../types.js";
import { filterDrillFromAttributeByPriority } from "../utils/drillDownUtils.js";
import { useDrills } from "../hooks/useDrills.js";
/**
 * @internal
 */
export function WithDrillSelect({ widgetRef, children, insight, onDrillDownSuccess, onDrillToInsightSuccess, onDrillToDashboardSuccess, onDrillToAttributeUrlSuccess, onDrillToCustomUrlSuccess, onError, }) {
    const { current: drillPickerId } = useRef(uuid());
    const [dropdownProps, setDropdownProps] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const locale = useDashboardSelector(selectLocale);
    const disableDefaultDrills = useDashboardSelector(selectDisableDefaultDrills); // TODO: maybe remove?
    const configuredDrills = useDashboardSelector(selectWidgetDrills(widgetRef));
    const drills = useDrills({
        onDrillSuccess: (s) => {
            if (disableDefaultDrills || s.payload.drillEvent.drillDefinitions.length === 0) {
                return;
            }
            const drillDefinitions = s.payload.drillEvent.drillDefinitions;
            const drillEvent = s.payload.drillEvent;
            const context = s.payload.drillContext;
            const filteredByPriority = filterDrillFromAttributeByPriority(drillDefinitions, configuredDrills);
            if (filteredByPriority.length === 1) {
                onSelect(filteredByPriority[0], drillEvent, s.correlationId, context);
            }
            else if (filteredByPriority.length > 1) {
                setDropdownProps({
                    drillDefinitions: filteredByPriority,
                    drillEvent: drillEvent,
                    drillContext: context,
                    correlationId: s.correlationId,
                });
                setIsOpen(true);
            }
        },
        onDrillDownSuccess,
        onDrillToInsightSuccess,
        onDrillToDashboardSuccess,
        onDrillToAttributeUrlSuccess,
        onDrillToCustomUrlSuccess,
        onError: (e) => onError === null || onError === void 0 ? void 0 : onError(e.payload.error),
    });
    const onSelect = useCallback((drillDefinition, drillEvent, correlationId, drillContext) => {
        var _a;
        const effectiveDrillEvent = drillEvent !== null && drillEvent !== void 0 ? drillEvent : dropdownProps === null || dropdownProps === void 0 ? void 0 : dropdownProps.drillEvent;
        const effectiveCorrelationId = correlationId !== null && correlationId !== void 0 ? correlationId : dropdownProps === null || dropdownProps === void 0 ? void 0 : dropdownProps.correlationId;
        const effectiveInsight = (_a = drillContext === null || drillContext === void 0 ? void 0 : drillContext.insight) !== null && _a !== void 0 ? _a : insight;
        if (effectiveDrillEvent) {
            if (isDrillDownDefinition(drillDefinition)) {
                drills.drillDown.run(effectiveInsight, drillDefinition, effectiveDrillEvent, effectiveCorrelationId);
            }
            else if (isDrillToInsight(drillDefinition)) {
                drills.drillToInsight.run(drillDefinition, effectiveDrillEvent, effectiveCorrelationId);
            }
            else if (isDrillToDashboard(drillDefinition)) {
                drills.drillToDashboard.run(drillDefinition, effectiveDrillEvent, effectiveCorrelationId);
            }
            else if (isDrillToAttributeUrl(drillDefinition)) {
                drills.drillToAttributeUrl.run(drillDefinition, effectiveDrillEvent, effectiveCorrelationId);
            }
            else if (isDrillToCustomUrl(drillDefinition)) {
                drills.drillToCustomUrl.run(drillDefinition, effectiveDrillEvent, effectiveCorrelationId);
            }
            setDropdownProps(null);
            setIsOpen(false);
        }
    }, [dropdownProps, insight]);
    const onClose = () => {
        setIsOpen(false);
    };
    const dropDownAnchorClass = `s-drill-picker-${drillPickerId}`;
    const drillDownDropdown = dropdownProps ? (React.createElement(IntlWrapper, { locale: locale },
        React.createElement(DrillSelectDropdown, Object.assign({}, dropdownProps, { dropDownAnchorClass: dropDownAnchorClass, isOpen: isOpen, onClose: onClose, onSelect: onSelect })))) : null;
    return (React.createElement("div", { className: cx("gd-drill-modal-wrapper-mask", dropDownAnchorClass) },
        children({ onDrill: drills.drill.run }),
        drillDownDropdown));
}
//# sourceMappingURL=WithDrillSelect.js.map