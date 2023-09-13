// (C) 2020-2022 GoodData Corporation
/**
 * Removes the element specified from the DOM
 */
export const removeFromDom = (element) => {
    if (element === null || element === void 0 ? void 0 : element.parentNode) {
        element.parentNode.removeChild(element);
    }
};
/**
 * Returns bounding rectangle of specified elements
 * in local (relative to offset parent of element)
 * coordinate space
 *
 * @param element - element to get the region for
 * @param ignoreScrollOffsets - whether to ignore scrollOffsets
 * @param windowObject - use for unit test only
 * @returns Bounding rectangle
 */
export const region = (element, ignoreScrollOffsets, windowObject = window) => {
    const boundingRect = element.getBoundingClientRect();
    const offsetLeft = (ignoreScrollOffsets ? 0 : windowObject.pageXOffset) + boundingRect.left;
    const offsetTop = (ignoreScrollOffsets ? 0 : windowObject.pageYOffset) + boundingRect.top;
    const width = element.offsetWidth || boundingRect.width;
    const height = element.offsetHeight || boundingRect.height;
    return {
        left: offsetLeft,
        top: offsetTop,
        width,
        height,
        bottom: offsetTop + height,
        right: offsetLeft + width,
    };
};
/**
 * Returns a value indicating whether the element
 * specified is mounted to the DOM
 */
const isInDom = (element) => {
    let elem = element;
    while (elem) {
        if (elem === document) {
            return true;
        }
        elem = elem.parentNode;
    }
    return false;
};
/**
 * Returns a value indicating whether the element
 * specified is fixed position
 * or is contained in fixed position element
 */
export const isFixedPosition = (element) => {
    var _a;
    let elem = typeof element === "string" ? document.querySelector(element) : element;
    if (!elem) {
        return true;
    }
    while (elem) {
        if (((_a = elem.style) === null || _a === void 0 ? void 0 : _a.position) === "fixed") {
            return true;
        }
        elem = elem.parentNode;
    }
    return false;
};
/**
 * Returns bounding rectangle of specified elements
 * in local (relative to offset parent of element)
 * coordinate space
 */
export const elementRegion = (elementOrSelector, getRegionBasedOnPosition) => {
    const elem = typeof elementOrSelector === "string"
        ? document.querySelector(elementOrSelector)
        : elementOrSelector;
    if (!elem) {
        return {};
    }
    if (isInDom(elem)) {
        // If element is contained within DOM, we can simply measure it as is
        return region(elem, getRegionBasedOnPosition && isFixedPosition(elem));
    }
    // In case the element is not yet in DOM
    // we have to append it first to be able to measure it.
    // Since we don't want to overwrite any CSS properties previously defined
    // on element, we have to back the old CSS properties up.
    const originalCss = {
        position: elem.style.position,
        visibility: elem.style.visibility,
    };
    // Append the element to DOM and ensure its not visible neither it causes
    // document reflow
    elem.style.position = "absolute";
    elem.style.visibility = "hidden";
    document.body.appendChild(elem);
    // Measure the element now
    const reg = region(elem);
    // Restore previous state as much as possible
    removeFromDom(elem);
    elem.style.position = originalCss.position;
    elem.style.visibility = originalCss.visibility;
    return reg;
};
//# sourceMappingURL=domUtilities.js.map