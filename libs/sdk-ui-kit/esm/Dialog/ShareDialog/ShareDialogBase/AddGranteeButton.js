// (C) 2021 GoodData Corporation
import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { BubbleHoverTrigger, Bubble } from "../../../Bubble/index.js";
/**
 * @internal
 */
export const AddUserOrGroupButton = (props) => {
    const { isDisabled, onClick } = props;
    const buttonClassNames = cx({
        disabled: isDisabled,
    }, "gd-button", "gd-button-link", "gd-icon-plus", "s-add-users-or-groups");
    const handleClick = useCallback((e) => {
        e.preventDefault();
        if (isDisabled) {
            return;
        }
        onClick();
    }, [isDisabled, onClick]);
    return (React.createElement("div", null,
        React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
            React.createElement("a", { className: buttonClassNames, target: "_blank", rel: "noopener noreferrer", onClick: handleClick },
                React.createElement(FormattedMessage, { id: "shareDialog.share.grantee.add" })),
            React.createElement(Bubble, { className: "bubble-primary", alignPoints: [{ align: "cr cl" }] },
                React.createElement(FormattedMessage, { id: "shareDialog.share.grantee.add.info" })))));
};
//# sourceMappingURL=AddGranteeButton.js.map