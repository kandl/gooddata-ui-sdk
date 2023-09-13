// (C) 2019-2022 GoodData Corporation
import React from "react";
import kebabCase from "lodash/kebabCase.js";
import cx from "classnames";
import { ListItem } from "../ListItem/ListItem.js";
import { ListHeading } from "../ListHeading/ListHeading.js";
import { RelativePresetTitleTranslated } from "../RelativePresetTitleTranslated/RelativePresetTitleTranslated.js";
import { DateFilterTextLocalized } from "../DateFilterTextLocalized/DateFilterTextLocalized.js";
const granularityOrder = [
    "GDC.time.year",
    "GDC.time.quarter",
    "GDC.time.month",
    "GDC.time.week_us",
    "GDC.time.date",
    "GDC.time.hour",
    "GDC.time.minute",
];
/**
 * @internal
 */
export const RelativePresetFilterItems = ({ dateFormat, filterOption, selectedFilterOption, onSelectedFilterOptionChange, className, }) => {
    const relativePresets = granularityOrder
        .filter((granularity) => {
        var _a;
        return Boolean(((_a = filterOption === null || filterOption === void 0 ? void 0 : filterOption[granularity]) === null || _a === void 0 ? void 0 : _a.length) > 0);
    })
        .map((granularity) => ({
        granularity,
        items: filterOption[granularity],
    }));
    return (React.createElement(React.Fragment, null, relativePresets.map((preset) => (React.createElement(React.Fragment, { key: preset.granularity },
        React.createElement(ListHeading, { className: className },
            React.createElement(RelativePresetTitleTranslated, { granularity: preset.granularity })),
        preset.items.map((item) => (React.createElement(ListItem, { key: item.localIdentifier, isSelected: item.localIdentifier === selectedFilterOption.localIdentifier, onClick: () => onSelectedFilterOptionChange(item), className: cx(`s-relative-preset-${kebabCase(item.localIdentifier)}`, className) },
            React.createElement(DateFilterTextLocalized, { filter: item, dateFormat: dateFormat })))))))));
};
//# sourceMappingURL=RelativePresetFilterItems.js.map