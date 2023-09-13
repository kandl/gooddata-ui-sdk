// (C) 2007-2022 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import cx from "classnames";
import { Input } from "../../Form/index.js";
/**
 * @internal
 */
export function InvertableSelectSearchBar(props) {
    const { className, isSmall, searchString, onSearch, searchPlaceholder } = props;
    const intl = useIntl();
    return (React.createElement(Input, { className: cx([
            "gd-invertable-select-search-input gd-list-searchfield gd-flex-item-mobile",
            className,
        ]), value: searchString, onChange: onSearch, placeholder: searchPlaceholder !== null && searchPlaceholder !== void 0 ? searchPlaceholder : intl.formatMessage({ id: "gs.list.search.placeholder" }), autofocus: true, clearOnEsc: true, isSearch: true, isSmall: isSmall }));
}
//# sourceMappingURL=InvertableSelectSearchBar.js.map