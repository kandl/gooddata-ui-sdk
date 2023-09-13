// (C) 2020-2022 GoodData Corporation
import React, { useState, useCallback } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import noop from "lodash/noop.js";
import cx from "classnames";
import { Message } from "./Message.js";
import { Overlay } from "../Overlay/index.js";
import { Typography } from "../Typography/index.js";
/**
 * @internal
 */
export const Messages = ({ messages = [], onMessageClose = noop }) => {
    const [expandedMessageIds, setExpandedMessageIds] = useState([]);
    const handleMessageClose = useCallback((messageId) => {
        setExpandedMessageIds((old) => old.filter((expandedId) => expandedId !== messageId));
        onMessageClose(messageId);
    }, [onMessageClose]);
    return (React.createElement(Overlay, null,
        React.createElement("div", { className: "gd-messages" },
            React.createElement(TransitionGroup, null,
                React.createElement(CSSTransition, { classNames: "gd-message", timeout: 220 },
                    React.createElement("div", null, messages.map((message) => {
                        const { id, component: Component, showMore, type, contrast, intensive, } = message;
                        const isExpanded = expandedMessageIds.includes(message.id);
                        return (React.createElement("div", { key: id },
                            React.createElement(Message, { className: cx(`gd-message-overlay`, !showMore && "gd-message-overlay", showMore && "gd-message-overlay-custom"), type: type, onClose: () => handleMessageClose(id), contrast: contrast, intensive: intensive }, Component ? (React.createElement(Component, null)) : (React.createElement(React.Fragment, null,
                                React.createElement(MessageWithShowMore, { message: message, shouldShowMore: !isExpanded, handleShowMore: () => {
                                        if (isExpanded) {
                                            setExpandedMessageIds((old) => old.filter((expandedId) => expandedId !== id));
                                        }
                                        else {
                                            setExpandedMessageIds((old) => [...old, id]);
                                        }
                                    } }),
                                React.createElement(MessageSimple, { message: message }))))));
                    })))))));
};
const MessageWithShowMore = ({ message, shouldShowMore, handleShowMore, }) => {
    const { showMore, showLess, errorDetail, type } = message;
    if (!showMore) {
        return null;
    }
    const contentClassNames = cx("gd-message-text-content", "s-message-text-content", type, {
        off: shouldShowMore,
        on: !shouldShowMore,
    });
    const showMoreLinkClassNames = cx("gd-message-text-showmorelink", "s-message-text-showmorelink", type);
    return (React.createElement("div", { className: "gd-message-text-showmore" },
        React.createElement(Typography, { tagName: "p", className: "gd-message-text-header" },
            React.createElement(MessageElement, { message: message, type: "span" }),
            React.createElement("span", { className: showMoreLinkClassNames, onClick: handleShowMore }, shouldShowMore ? showMore : showLess)),
        React.createElement("div", { className: contentClassNames }, errorDetail)));
};
const MessageSimple = ({ message }) => {
    const { showMore } = message;
    if (showMore) {
        return null;
    }
    return React.createElement(MessageElement, { message: message, type: "div" });
};
const MessageElement = ({ message, type }) => {
    const { text, node } = message;
    const Component = type;
    if (node) {
        return React.createElement(Component, { className: "s-message-text-header-value" }, node);
    }
    return (React.createElement(Component, { className: "s-message-text-header-value", dangerouslySetInnerHTML: { __html: text || "" } }));
};
//# sourceMappingURL=Messages.js.map