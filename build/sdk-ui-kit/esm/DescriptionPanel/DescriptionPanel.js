// (C) 2022 GoodData Corporation
import React from "react";
import isEmpty from "lodash/isEmpty.js";
import { IntlWrapper } from "@gooddata/sdk-ui";
import { EllipsisText } from "./EllipsisText.js";
import { Bubble, BubbleHoverTrigger } from "../Bubble/index.js";
import { useMediaQuery } from "../responsive/index.js";
import cx from "classnames";
/**
 * @internal
 */
export const DESCRIPTION_PANEL_ALIGN_POINTS = [
    { align: "cr cl" },
    { align: "tr tl" },
    { align: "br bl" },
    { align: "bc tc" },
    { align: "bl tl" },
    { align: "br tr" },
    { align: "tc bc" },
    { align: "tr br" },
    { align: "tl bl" },
    { align: "cl cr" },
    { align: "tl tr" },
    { align: "bl br" },
];
/**
 * @internal
 */
export const DESCRIPTION_PANEL_ARROW_OFFSETS = {
    "br tr": [0, 5],
    "bc tc": [0, 5],
    "bl tl": [0, 5],
    "tr br": [0, -5],
    "tc bc": [0, -5],
    "tl bl": [0, -5],
    "tr tl": [5, 0],
    "cr cl": [5, 0],
    "br bl": [5, 0],
    "tl tr": [-5, 0],
    "cl cr": [-5, 0],
    "bl br": [-5, 0],
};
/**
 * @internal
 */
export const DescriptionPanel = (props) => (React.createElement(IntlWrapper, { locale: props.locale },
    React.createElement(DescriptionPanelCore, Object.assign({}, props))));
/**
 * @internal
 */
export const DescriptionPanelContent = (props) => (React.createElement(IntlWrapper, { locale: props.locale },
    React.createElement(DescriptionPanelContentCore, Object.assign({}, props))));
/**
 * @internal
 */
export const DescriptionIcon = ({ className }) => {
    const isMobileDevice = useMediaQuery("mobileDevice");
    return (React.createElement("div", { className: cx("s-description-trigger", {
            "is-mobile": isMobileDevice,
            "gd-icon-circle-question-wrapper": !className,
        }, className) },
        React.createElement("div", { className: "gd-icon-circle-question" })));
};
const DescriptionPanelCore = (props) => {
    const { arrowOffsets = DESCRIPTION_PANEL_ARROW_OFFSETS } = props;
    return (React.createElement(BubbleHoverTrigger, { onBubbleOpen: props.onBubbleOpen, showDelay: 0, eventsOnBubble: true },
        React.createElement(DescriptionIcon, { className: props.className }),
        React.createElement(Bubble, { className: "bubble-light gd-description-panel-bubble", alignPoints: DESCRIPTION_PANEL_ALIGN_POINTS, arrowOffsets: arrowOffsets, arrowStyle: { display: "none" } },
            React.createElement(DescriptionPanelContentCore, Object.assign({}, props)))));
};
const DescriptionPanelContentCore = (props) => {
    const { title, description } = props;
    return (React.createElement("div", { className: "gd-description-panel s-gd-description-panel" },
        !isEmpty(title) && React.createElement("div", { className: "gd-description-panel-title" }, title),
        !isEmpty(description) && (React.createElement("div", { className: "gd-description-panel-content" },
            React.createElement(EllipsisText, { text: description })))));
};
//# sourceMappingURL=DescriptionPanel.js.map