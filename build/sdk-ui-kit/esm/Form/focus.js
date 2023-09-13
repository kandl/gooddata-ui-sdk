// (C) 2021-2022 GoodData Corporation
import { invariant } from "ts-invariant";
export function runAutofocus(element, autofocus) {
    const data = { frame: null, element, start: new Date().getTime() };
    if (autofocus) {
        startAutofocus(data);
    }
    return () => cancelAutofocus(data);
}
function isVisible(element) {
    if (element) {
        const style = window.getComputedStyle(element);
        const notHidden = style.visibility !== "hidden";
        const notNone = style.display !== "none";
        const hasSize = element.offsetHeight > 0;
        return notHidden && notNone && hasSize;
    }
    return false;
}
function startAutofocus(data) {
    if (reportWarning(data)) {
        return;
    }
    cancelAutofocus(data);
    data.frame = window.requestAnimationFrame(() => {
        if (isVisible(data.element)) {
            data.element.focus();
        }
        else {
            startAutofocus(data);
        }
    });
}
function cancelAutofocus(data) {
    if (data.frame !== null) {
        window.cancelAnimationFrame(data.frame);
    }
    data.frame = null;
}
function reportWarning(data) {
    const current = new Date().getTime();
    const long = current - data.start > 10000;
    if (long) {
        invariant.warn(`Can not autofocus provided dom element: `, data.element);
        return true;
    }
    return false;
}
//# sourceMappingURL=focus.js.map