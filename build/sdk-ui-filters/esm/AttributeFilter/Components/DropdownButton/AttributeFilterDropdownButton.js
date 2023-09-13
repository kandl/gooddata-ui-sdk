// (C) 2022-2023 GoodData Corporation
import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { stringUtils } from "@gooddata/util";
import cx from "classnames";
import { ShortenedText } from "@gooddata/sdk-ui-kit";
import { AttributeFilterButtonToolip } from "./AttributeFilterButtonTooltip.js";
export const ALIGN_POINT = [
    { align: "tc bc", offset: { x: 0, y: -2 } },
    { align: "cc tc", offset: { x: 0, y: 10 } },
    { align: "bl tr", offset: { x: -2, y: -8 } },
];
/**
 * Dropdown button for the AttributeFilter.
 *
 * @remarks
 * This component implements the {@link IAttributeFilterDropdownButtonProps} interface.
 * It displays AttributeFilterDropdownButton in the GoodData look and feel.
 * It displays the name of the related attribute filter as a title and the state of the selection as a subtitle.
 * It displays loading and filtering statuses.
 * It supports setting a left icon and dragging icons.
 *
 * @beta
 */
export const AttributeFilterDropdownButton = (props) => {
    const { isOpen, title, selectedItemsCount, showSelectionCount = true, subtitle, isFiltering, isLoading, isLoaded, isError, isDraggable, icon, TooltipContentComponent, onClick, } = props;
    const intl = useIntl();
    const subtitleSelectedItemsRef = useRef(null);
    const [displayItemCount, setDisplayItemCount] = useState(false);
    const filterIcon = isError ? React.createElement("i", { className: "gd-icon gd-icon-circle-cross" }) : icon;
    useEffect(() => {
        const element = subtitleSelectedItemsRef.current;
        if (!element) {
            return;
        }
        const roundedWidth = Math.ceil(element.getBoundingClientRect().width);
        const displayItemCount = roundedWidth < element.scrollWidth;
        setDisplayItemCount(displayItemCount);
    }, [subtitle]);
    let buttonTitle = title;
    let buttonSubtitle = subtitle;
    if (isLoading) {
        buttonTitle = intl.formatMessage({ id: "loading" });
        buttonSubtitle = intl.formatMessage({ id: "loading" });
    }
    else if (isFiltering) {
        buttonSubtitle = intl.formatMessage({ id: "filtering" });
    }
    return (React.createElement("div", { className: cx("gd-attribute-filter-dropdown-button__next", "s-attribute-filter", `s-${stringUtils.simplifyText(title)}`, {
            "gd-message": isError,
            "gd-is-filtering": isFiltering,
            "gd-is-active": isOpen,
            "gd-is-loaded": isLoaded,
            "gd-is-draggable": isDraggable,
        }), onClick: onClick },
        filterIcon ? (React.createElement("div", { className: "gd-attribute-filter-dropdown-button-icon__next" }, filterIcon)) : null,
        React.createElement("div", { className: "gd-attribute-filter-dropdown-button-content__next" },
            React.createElement("div", { className: "gd-attribute-filter-dropdown_button-title-content__next" },
                React.createElement("div", { className: "gd-attribute-filter-dropdown-button-title__next" },
                    React.createElement(ShortenedText, { tooltipAlignPoints: ALIGN_POINT, className: "s-attribute-filter-button-title" }, `${buttonTitle}${!isLoading && !isFiltering ? ":" : ""}`)),
                TooltipContentComponent && isLoaded ? (React.createElement(AttributeFilterButtonToolip, null,
                    React.createElement(TooltipContentComponent, null))) : null),
            React.createElement("div", { className: "gd-attribute-filter-dropdown-button-subtitle__next" },
                React.createElement("span", { className: "gd-attribute-filter-dropdown-button-selected-items__next s-attribute-filter-button-subtitle", ref: subtitleSelectedItemsRef }, buttonSubtitle),
                showSelectionCount && displayItemCount ? (React.createElement("span", { className: "gd-attribute-filter-dropdown-button-selected-items-count__next" }, `(${selectedItemsCount})`)) : null))));
};
//# sourceMappingURL=AttributeFilterDropdownButton.js.map