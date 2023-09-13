// (C) 2007-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Message } from "../../Messages/index.js";
/**
 * @internal
 */
export function InvertableSelectLimitWarning(props) {
    const { limit, selectedItemsCount } = props;
    return (React.createElement(Message, { type: "warning", className: "gd-invertable-list-limitExceeded" },
        selectedItemsCount === limit && (React.createElement(FormattedMessage, { id: "gs.list.limitReached", values: { limit } })),
        selectedItemsCount > limit && (React.createElement(FormattedMessage, { id: "gs.list.cannotSelectMoreValues", values: { limit } }))));
}
//# sourceMappingURL=InvertableSelectLimitWarning.js.map