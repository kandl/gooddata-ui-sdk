// (C) 2022 GoodData Corporation
import React, { useState, useCallback } from "react";
import cx from "classnames";
import { DescriptionIcon, DescriptionPanelContent, Bubble, DESCRIPTION_PANEL_ARROW_OFFSETS, } from "@gooddata/sdk-ui-kit";
const DESCRIPTION_PANEL_ALIGN_POINTS = [
    { align: "tr tl" },
    { align: "cr cl" },
    { align: "br bl" },
    { align: "tl tr" },
    { align: "cl cr" },
    { align: "bl br" },
    { align: "bl tl" },
    { align: "bc tc" },
    { align: "br tr" },
    { align: "tl bl" },
    { align: "tc bc" },
    { align: "tr br" },
];
export const DescriptionClickTrigger = (props) => {
    const { onOpen } = props;
    const [isOpen, setIsOpen] = useState(false);
    const switchIsOpen = useCallback(() => {
        setIsOpen((isOpen) => {
            if (!isOpen && onOpen) {
                onOpen();
            }
            return !isOpen;
        });
    }, [setIsOpen, onOpen]);
    const iconClassName = cx("dash-item-action-description", {
        "dash-item-action-description-active": isOpen,
    }, props.className);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: iconClassName, onClick: switchIsOpen },
            React.createElement(DescriptionIcon, { className: "dash-item-action-description-trigger" })),
        isOpen ? (React.createElement(Bubble, { className: "bubble-light gd-description-panel-bubble", alignPoints: DESCRIPTION_PANEL_ALIGN_POINTS, arrowOffsets: DESCRIPTION_PANEL_ARROW_OFFSETS, arrowStyle: { display: "none" }, onClose: switchIsOpen, closeOnOutsideClick: true, closeOnParentScroll: false, alignTo: `.${props.className}` },
            React.createElement(DescriptionPanelContent, Object.assign({}, props)))) : null));
};
//# sourceMappingURL=DescriptionClickTrigger.js.map