// (C) 2023 GoodData Corporation
import { __rest } from "tslib";
import { Bubble } from "./Bubble.js";
import { BubbleHoverTrigger } from "./BubbleHoverTrigger.js";
import React from "react";
import { useIntl } from "react-intl";
/**
 * @internal
 */
export function withBubble(WrappedComponent) {
    const ResultComponent = (props) => {
        const { showBubble = true, alignPoints = [{ align: "cr cl" }], bubbleTextId, triggerClassName } = props, wrappedComponentProps = __rest(props, ["showBubble", "alignPoints", "bubbleTextId", "triggerClassName"]);
        const intl = useIntl();
        if (!showBubble || !bubbleTextId) {
            return React.createElement(WrappedComponent, Object.assign({}, props));
        }
        const bubbleText = intl.formatMessage({ id: bubbleTextId });
        return (React.createElement(BubbleHoverTrigger, { className: triggerClassName },
            React.createElement(WrappedComponent, Object.assign({}, wrappedComponentProps)),
            React.createElement(Bubble, { alignPoints: alignPoints },
                React.createElement("div", null, bubbleText))));
    };
    return ResultComponent;
}
//# sourceMappingURL=withBubble.js.map