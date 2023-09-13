// (C) 2019-2022 GoodData Corporation
import React from "react";
import kebabCase from "lodash/kebabCase.js";
import cx from "classnames";
import { ListItem } from "../ListItem/ListItem.js";
import { DateFilterTextLocalized } from "../DateFilterTextLocalized/DateFilterTextLocalized.js";
export const AbsolutePresetFilterItems = ({ filterOptions, dateFormat, selectedFilterOption, onSelectedFilterOptionChange, className, }) => (React.createElement(React.Fragment, null, filterOptions.map((item) => (React.createElement(ListItem, { key: item.localIdentifier, isSelected: item.localIdentifier === selectedFilterOption.localIdentifier, onClick: () => onSelectedFilterOptionChange(item), className: cx(`s-absolute-preset-${kebabCase(item.localIdentifier)}`, className) },
    React.createElement(DateFilterTextLocalized, { filter: item, dateFormat: dateFormat }))))));
//# sourceMappingURL=AbsolutePresetFilterItems.js.map