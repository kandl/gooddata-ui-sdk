// (C) 2022-2023 GoodData Corporation
import React, { useState, useCallback, useMemo } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { IntlWrapper } from "@gooddata/sdk-ui";
import isEqual from "lodash/isEqual.js";
import { ChartSortingDropdownBody } from "./ChartSortingDropdownBody.js";
import { ChartSortingDropdown } from "./ChartSortingDropdown.js";
import { Button } from "../Button/index.js";
/**
 * @internal
 */
export const ChartSorting = ({ currentSort, availableSorts, intl, bucketItems, buttonNode, onCancel, onApply, enableRenamingMeasureToMetric, }) => {
    const [currentSelectedSort, setCurrentSort] = useState(currentSort);
    const handleApply = useCallback(() => {
        onApply(currentSelectedSort);
    }, [onApply, currentSelectedSort]);
    const onSelect = (item) => {
        setCurrentSort(item);
    };
    const isApplyEnabled = useMemo(() => !isEqual(currentSort, currentSelectedSort), [currentSort, currentSelectedSort]);
    return (React.createElement(ChartSortingDropdownBody, { buttonNode: buttonNode, onClose: onCancel },
        React.createElement("div", { className: "gd-sort-charting-dropdown-header s-sort-charting-dropdown-header" },
            React.createElement(FormattedMessage, { id: "sorting.dropdown.header" })),
        React.createElement("div", { className: "gd-sort-charting-body gd-sort-charting-dropdown" },
            React.createElement(ChartSortingDropdown, { currentSort: currentSelectedSort, availableSorts: availableSorts, bucketItems: bucketItems, intl: intl, onSelect: onSelect, enableRenamingMeasureToMetric: enableRenamingMeasureToMetric })),
        React.createElement("div", { className: "gd-chart-sorting-dropdown-footer" },
            React.createElement(Button, { className: "gd-button-secondary gd-button-small s-sorting-dropdown-cancel", value: intl.formatMessage({ id: "cancel" }), onClick: onCancel }),
            React.createElement(Button, { className: "gd-button-action gd-button-small s-sorting-dropdown-apply", value: intl.formatMessage({ id: "apply" }), onClick: handleApply, disabled: !isApplyEnabled }))));
};
/**
 * @internal
 */
export const ChartSortingWithIntl = injectIntl(ChartSorting);
/**
 * @internal
 */
export const ChartSortingDialog = (props) => (React.createElement(IntlWrapper, { locale: props.locale },
    React.createElement(ChartSortingWithIntl, Object.assign({}, props))));
//# sourceMappingURL=ChartSorting.js.map