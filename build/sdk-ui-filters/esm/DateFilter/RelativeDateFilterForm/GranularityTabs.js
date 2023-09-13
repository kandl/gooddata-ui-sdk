// (C) 2019-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import sortBy from "lodash/sortBy.js";
import { TabsWrapper, Tab } from "../Tabs/Tabs.js";
import { granularityIntlCodes } from "../constants/i18n.js";
import { messages } from "../../locales.js";
const granularityOrders = {
    "GDC.time.year": 0,
    "GDC.time.quarter": 1,
    "GDC.time.month": 2,
    "GDC.time.week_us": 3,
    "GDC.time.date": 4,
    "GDC.time.hour": 5,
    "GDC.time.minute": 6,
};
const sortGranularities = (granularities) => sortBy(granularities, (granularity) => granularityOrders[granularity]);
export const GranularityTabs = ({ availableGranularities, onSelectedGranularityChange, selectedGranularity, }) => (React.createElement(TabsWrapper, { className: "gd-relative-filter-form-granularity-tabs s-relative-filter-form-granularity-tabs" }, sortGranularities(availableGranularities).map((granularity) => {
    const intlGranularity = granularityIntlCodes[granularity];
    return (React.createElement(Tab, { key: granularity, selected: granularity === selectedGranularity, onClick: () => onSelectedGranularityChange(granularity), className: `s-granularity-${intlGranularity}` },
        React.createElement(FormattedMessage, { id: messages[intlGranularity].id })));
})));
//# sourceMappingURL=GranularityTabs.js.map