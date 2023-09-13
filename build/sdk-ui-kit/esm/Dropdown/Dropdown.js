// (C) 2007-2023 GoodData Corporation
import React, { useState, useCallback, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import noop from "lodash/noop.js";
import { FullScreenOverlay, Overlay } from "../Overlay/index.js";
import { useMediaQuery } from "../responsive/useMediaQuery.js";
const SCROLLBAR_SELECTOR = ".fixedDataTableLayout_main .ScrollbarLayout_main";
const MOBILE_DROPDOWN_ALIGN_POINTS = [
    {
        align: "tl tl",
    },
];
/**
 * Element.matches is only supported via prefix in IE11 and Edge.
 */
function matches(element, selector) {
    var _a;
    const matchesImpl = (_a = element.matches) !== null && _a !== void 0 ? _a : element.msMatchesSelector;
    return matchesImpl.call(element, selector);
}
/**
 * Prevent the overlay from closing when scrolling and finishing
 * with a cursor position outside of the overlay.
 */
function shouldCloseOnClick(e) {
    var _a;
    const activeElement = (_a = document.activeElement) !== null && _a !== void 0 ? _a : e.target;
    if (!activeElement) {
        return false;
    }
    const hasScrolled = matches(activeElement, SCROLLBAR_SELECTOR);
    return !hasScrolled;
}
/**
 * @internal
 */
export const Dropdown = (props) => {
    const { className, openOnInit, closeOnParentScroll, closeOnMouseDrag, closeOnOutsideClick = true, overlayPositionType, alignPoints = [
        {
            align: "bl tl",
        },
    ], overlayZIndex, ignoreClicksOnByClass = [], renderBody, renderButton, onOpenStateChanged, fullscreenOnMobile = true, enableEventPropagation = false, } = props;
    const [{ isOpen, dropdownId }, setState] = useState({
        isOpen: !!openOnInit,
        dropdownId: `dropdown-${uuid()}`,
    });
    const _renderButton = (renderProps) => (React.createElement("div", { className: dropdownId }, renderButton(renderProps)));
    const toggleDropdown = useCallback(() => {
        setState((state) => (Object.assign(Object.assign({}, state), { isOpen: !state.isOpen })));
    }, []);
    const closeDropdown = useCallback(() => {
        setState((state) => (Object.assign(Object.assign({}, state), { isOpen: false })));
    }, []);
    const openDropdown = useCallback(() => {
        setState((state) => (Object.assign(Object.assign({}, state), { isOpen: true })));
    }, []);
    const mountRef = useRef(false);
    useEffect(() => {
        if (mountRef.current && onOpenStateChanged) {
            onOpenStateChanged(isOpen);
        }
        return () => {
            mountRef.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);
    const renderButtonProps = {
        isOpen: isOpen,
        openDropdown: openDropdown,
        closeDropdown: closeDropdown,
        toggleDropdown: toggleDropdown,
    };
    const isMobileDevice = useMediaQuery("mobileDevice");
    const renderDropdown = isOpen &&
        (fullscreenOnMobile && isMobileDevice ? (React.createElement(FullScreenOverlay, { alignTo: "body", alignPoints: MOBILE_DROPDOWN_ALIGN_POINTS },
            React.createElement("div", { className: "gd-mobile-dropdown-overlay overlay gd-flex-row-container" },
                React.createElement("div", { className: "gd-mobile-dropdown-header gd-flex-item" }, _renderButton(Object.assign(Object.assign({}, renderButtonProps), { isMobile: true }))),
                React.createElement("div", { className: "gd-mobile-dropdown-content gd-flex-item-stretch gd-flex-row-container" }, renderBody({
                    closeDropdown,
                    isMobile: true,
                }))))) : (React.createElement(Overlay, { alignTo: `.${dropdownId}`, positionType: overlayPositionType, alignPoints: alignPoints, closeOnOutsideClick: closeOnOutsideClick, closeOnMouseDrag: closeOnMouseDrag, closeOnParentScroll: closeOnParentScroll, shouldCloseOnClick: shouldCloseOnClick, ignoreClicksOnByClass: ignoreClicksOnByClass, onClose: closeDropdown, 
            // Overlay prevents event propagation by default using defaultProps for these
            onClick: enableEventPropagation ? noop : undefined, onMouseOver: enableEventPropagation ? noop : undefined, onMouseUp: enableEventPropagation ? noop : undefined, zIndex: overlayZIndex },
            React.createElement("div", { className: "overlay dropdown-body" }, renderBody({
                closeDropdown,
                isMobile: false,
            })))));
    return (React.createElement("div", { className: className },
        _renderButton(Object.assign(Object.assign({}, renderButtonProps), { isMobile: false })),
        renderDropdown));
};
//# sourceMappingURL=Dropdown.js.map