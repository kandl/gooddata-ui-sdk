import { __rest } from "tslib";
// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import DefaultMediaQuery from "react-responsive";
import { defaultImport } from "default-import";
import { CustomizableCheckmark } from "@gooddata/sdk-ui-kit";
import { MediaQueries } from "../../constants/index.js";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const MediaQuery = defaultImport(DefaultMediaQuery);
export const ListItem = (_a) => {
    var { isSelected: isActive, className, children } = _a, restProps = __rest(_a, ["isSelected", "className", "children"]);
    return (React.createElement(React.Fragment, null,
        React.createElement("button", Object.assign({ className: cx("gd-list-item", "gd-filter-list-item", {
                "is-selected": isActive,
                "gd-filter-list-item-selected": isActive,
            }, className) }, restProps),
            children,
            isActive ? (React.createElement(MediaQuery, { query: MediaQueries.IS_MOBILE_DEVICE },
                React.createElement(CustomizableCheckmark, { className: "gd-customizable-checkmark-mobile-date-filter" }))) : null)));
};
//# sourceMappingURL=ListItem.js.map