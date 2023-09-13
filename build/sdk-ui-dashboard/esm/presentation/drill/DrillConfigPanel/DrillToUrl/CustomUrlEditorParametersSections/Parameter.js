// (C) 2020-2022 GoodData Corporation
import React, { useState } from "react";
import classNames from "classnames";
import { Button, Bubble } from "@gooddata/sdk-ui-kit";
import { stringUtils } from "@gooddata/util";
import { isDarkTheme, useTheme } from "@gooddata/sdk-ui-theme-provider";
export const Parameter = (props) => {
    const { name, description, detailContent, iconClassName, onAdd, intl } = props;
    const [displayHelp, setDisplayHelp] = useState(false);
    const theme = useTheme();
    const isDark = theme && isDarkTheme(theme);
    const id = `${stringUtils.simplifyText(name)}${description ? stringUtils.simplifyText(`_${description}`) : ""}`;
    const itemClassNames = classNames("gd-list-item gd-menu-item", `s-parameter-${id}`, iconClassName);
    const addButtonLabel = intl.formatMessage({
        id: "configurationPanel.drillIntoUrl.editor.addParameterButtonLabel",
    });
    return (React.createElement("div", { id: id, className: itemClassNames, onClick: () => onAdd() },
        React.createElement("span", { className: "gd-parameter-title" }, name),
        description ? React.createElement("span", { className: "addon s-parameter-description" },
            "(",
            description,
            ")") : null,
        React.createElement(Button, { className: "gd-button gd-button-link s-parameter-add-button", value: addButtonLabel }),
        React.createElement("div", { className: "gd-list-item-tooltip" },
            React.createElement("span", { className: "gd-icon-circle-question gd-list-item-tooltip-icon s-parameter-help-icon", onMouseEnter: () => setDisplayHelp(true), onMouseLeave: () => setDisplayHelp(false) }),
            displayHelp ? (React.createElement(Bubble, { className: `themed-bubble ${isDark ? "bubble-primary" : "bubble-light"}`, alignTo: `#${id}`, alignPoints: [{ align: "cr tl" }] }, detailContent)) : null)));
};
//# sourceMappingURL=Parameter.js.map