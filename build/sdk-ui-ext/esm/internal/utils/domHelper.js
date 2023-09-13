// (C) 2019-2022 GoodData Corporation
import { unmountComponentAtNode } from "react-dom";
/**
 * @internal
 */
export function unmountComponentsAtNodes(elementsOrSelectors = [], { unmount, documentInstance, } = {
    unmount: unmountComponentAtNode,
    documentInstance: document,
}) {
    elementsOrSelectors.forEach((elementOrSelector) => {
        const element = typeof elementOrSelector === "string"
            ? documentInstance.querySelector(elementOrSelector)
            : elementOrSelector;
        if (element) {
            unmount(element);
        }
    });
}
//# sourceMappingURL=domHelper.js.map