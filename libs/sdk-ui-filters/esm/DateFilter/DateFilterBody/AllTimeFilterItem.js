// (C) 2019-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { ListItem } from "../ListItem/ListItem.js";
export const AllTimeFilterItem = ({ className, filterOption, selectedFilterOption, onSelectedFilterOptionChange }) => (React.createElement(ListItem, { isSelected: filterOption.localIdentifier === selectedFilterOption.localIdentifier, onClick: () => onSelectedFilterOptionChange(filterOption), className: cx("s-all-time", className) }, filterOption.name ? filterOption.name : React.createElement(FormattedMessage, { id: "filters.allTime.title" })));
//# sourceMappingURL=AllTimeFilterItem.js.map