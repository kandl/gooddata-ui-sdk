// (C) 2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger, Button } from "@gooddata/sdk-ui-kit";
const ALIGN_POINTS = [{ align: "bc tc", offset: { x: -1, y: 5 } }];
/**
 * @internal
 */
export const AttributeFilterDeleteButton = (props) => {
    const { onDelete } = props;
    return (React.createElement("div", { className: "gd-attribute-filter-delete-button" },
        React.createElement(BubbleHoverTrigger, null,
            React.createElement(Button, { className: "gd-button-link gd-button-icon-only gd-button-small gd-icon-trash gd-delete-button s-delete-button", disabled: false, onClick: onDelete }),
            React.createElement(Bubble, { className: `bubble-primary`, alignPoints: ALIGN_POINTS },
                React.createElement(FormattedMessage, { id: "attributesDropdown.removeTooltip" })))));
};
//# sourceMappingURL=AttributeFilterDeleteButton.js.map