// (C) 2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger, Button } from "@gooddata/sdk-ui-kit";
const ALIGN_POINTS = [{ align: "bc tc", offset: { x: -1, y: 5 } }];
/**
 * @internal
 */
export const AttributeFilterConfigurationButton = (props) => {
    const { onConfiguration } = props;
    return (React.createElement("div", { className: "gd-attribute-filter-configuration-button" },
        React.createElement(BubbleHoverTrigger, null,
            React.createElement(Button, { className: "gd-button-link gd-button-icon-only gd-icon-settings gd-button-small gd-configuration-button s-configuration-button", disabled: false, onClick: onConfiguration }),
            React.createElement(Bubble, { className: `bubble-primary`, alignPoints: ALIGN_POINTS },
                React.createElement(FormattedMessage, { id: "attributesDropdown.configuration" })))));
};
//# sourceMappingURL=AttributeFilterConfigurationButton.js.map