// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { ExcludeCurrentPeriodToggleLabel } from "./ExcludeCurrentPeriodToggleLabel.js";
const alignPoints = [{ align: "tc bc" }];
export const ExcludeCurrentPeriodToggle = ({ value, onChange, disabled, granularity, }) => (React.createElement("div", { className: "gd-extended-date-filter-exclude-current" },
    React.createElement(BubbleHoverTrigger, null,
        React.createElement("label", { className: cx("s-exclude-current-period", "input-checkbox-label", {
                "s-exclude-current-perod-enabled": !disabled,
                "s-exclude-current-perod-disabled": disabled,
            }) },
            React.createElement("input", { type: "checkbox", className: "input-checkbox", checked: value, onChange: (e) => onChange(e.target.checked), disabled: disabled }),
            "\u2002",
            React.createElement(ExcludeCurrentPeriodToggleLabel, { granularity: granularity, disabled: disabled })),
        disabled ? (React.createElement(Bubble, { alignPoints: alignPoints },
            React.createElement(FormattedMessage, { id: "filters.excludeCurrentPeriod.unavailable" }))) : null)));
//# sourceMappingURL=ExcludeCurrentPeriodToggle.js.map