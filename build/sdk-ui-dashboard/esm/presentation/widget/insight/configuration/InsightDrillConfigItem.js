// (C) 2019-2022 GoodData Corporation
import React, { useMemo } from "react";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import { stringUtils } from "@gooddata/util";
import { DRILL_TARGET_TYPE } from "../../../drill/types.js";
import { DrillOriginItem } from "./DrillOriginItem.js";
import { DrillTargetType } from "./DrillTargetType.js";
import { DrillTargets } from "./DrillTargets/DrillTargets.js";
import { areObjRefsEqual, isAttributeDescriptor, } from "@gooddata/sdk-model";
import { selectDrillTargetsByWidgetRef, selectSelectedWidgetRef, useDashboardSelector, selectCatalogDateDatasets, } from "../../../../model/index.js";
import { invariant } from "ts-invariant";
const DrillConfigItem = ({ item, enabledDrillTargetTypeItems, onIncompleteChange, onSetup, onDelete, }) => {
    const onDeleteClick = () => {
        onDelete(item);
    };
    const onDrillTargetTypeSelect = (target) => {
        onIncompleteChange(Object.assign(Object.assign({}, item), { drillTargetType: target }));
    };
    const classNames = cx("s-drill-config-item", `s-drill-config-item-${stringUtils.simplifyText(item.title)}`, {
        "s-drill-config-item-incomplete": !item.complete,
    });
    const targetClassNames = cx("s-drill-config-target", "drill-config-target", {
        "drill-config-target-with-warning": !!item.warning,
    });
    const widgetRef = useDashboardSelector(selectSelectedWidgetRef);
    invariant(widgetRef, "mush have widget selected");
    const { isFromDateAttribute, showDateFilterTransferWarning } = useDateAttributeOptions(item, widgetRef);
    return (React.createElement("div", { className: classNames },
        React.createElement("div", { className: "drill-config-item-intro" },
            React.createElement(FormattedMessage, { id: "configurationPanel.drillConfig.clickHintItem", values: {
                    addon: (chunks) => React.createElement("span", { className: "addon" }, chunks),
                } })),
        React.createElement(DrillOriginItem, { type: item.type, title: item.title, localIdentifier: item.localIdentifier, onDelete: onDeleteClick, isDateAttribute: isFromDateAttribute }),
        React.createElement("div", { className: targetClassNames },
            React.createElement("div", { className: "drill-config-target-box" },
                React.createElement("div", { className: "drill-config-item-target" },
                    React.createElement(FormattedMessage, { id: "configurationPanel.drillConfig.selectTarget" })),
                React.createElement(DrillTargetType, { onSelect: onDrillTargetTypeSelect, selection: item.drillTargetType, enabledDrillTargetTypeItems: enabledDrillTargetTypeItems }),
                React.createElement(DrillTargets, { item: item, onSetup: onSetup }),
                !!item.warning && (React.createElement("div", { className: "drill-config-target-warning s-drill-config-target-warning" },
                    React.createElement("span", { className: "gd-icon-warning" }),
                    React.createElement("span", null,
                        React.createElement(FormattedMessage, { id: item.warning })))),
                !!showDateFilterTransferWarning && (React.createElement("div", { className: "drill-config-date-filter-warning s-drill-config-date-filter-warning" },
                    React.createElement("span", null,
                        React.createElement(FormattedMessage, { id: "configurationPanel.drillConfig.drillIntoDashboard.dateFilterWarning" }))))))));
};
function useDateAttributeOptions(item, widgetRef) {
    var _a;
    const dateAttributes = useDashboardSelector(selectCatalogDateDatasets);
    const drillTargets = useDashboardSelector(selectDrillTargetsByWidgetRef(widgetRef));
    return useMemo(() => {
        var _a, _b;
        const attributeTarget = (_b = (_a = drillTargets === null || drillTargets === void 0 ? void 0 : drillTargets.availableDrillTargets) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.find((attribute) => attribute.attribute.attributeHeader.localIdentifier === item.localIdentifier);
        const isFromDateAttribute = !!(attributeTarget &&
            isAttributeDescriptor(attributeTarget.attribute) &&
            dateAttributes.some((attribute) => attribute.dateAttributes.some((dateAttribute) => areObjRefsEqual(dateAttribute.attribute.ref, attributeTarget.attribute.attributeHeader.formOf.ref))));
        const isDateAttributeInIntersection = item.type === "measure" &&
            item.attributes.some((attr) => dateAttributes.some((x) => x.dateAttributes.some((d) => areObjRefsEqual(d.attribute.ref, attr.attributeHeader.ref))));
        const showDateFilterTransferWarning = item.drillTargetType === DRILL_TARGET_TYPE.DRILL_TO_DASHBOARD &&
            (isFromDateAttribute || isDateAttributeInIntersection);
        return {
            isFromDateAttribute,
            isDateAttributeInIntersection,
            showDateFilterTransferWarning,
        };
    }, [
        (_a = drillTargets === null || drillTargets === void 0 ? void 0 : drillTargets.availableDrillTargets) === null || _a === void 0 ? void 0 : _a.attributes,
        dateAttributes,
        item.type,
        item.attributes,
        item.drillTargetType,
        item.localIdentifier,
    ]);
}
export default DrillConfigItem;
//# sourceMappingURL=InsightDrillConfigItem.js.map