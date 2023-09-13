//
//
//
let host;
try {
    // eslint-disable-next-line no-restricted-globals
    host = parent; // do not use check `typeof parent` due to IE11 "Access denied error", instead wrap by try/catch
}
catch (e) {
    host = {}; // use mocked host object when running in node (e2e tests)
}
const receivers = [];
let config = {
    product: "",
    validReceivedPostEvents: [],
};
const receiveListener = (listener) => (event) => {
    var _a, _b, _c, _d, _e;
    return ((_b = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.gdc) === null || _b === void 0 ? void 0 : _b.product) === config.product &&
        // check for valid incoming command
        config.validReceivedPostEvents.includes((_e = (_d = (_c = event === null || event === void 0 ? void 0 : event.data) === null || _c === void 0 ? void 0 : _c.gdc) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.name)
        ? listener(event)
        : false;
};
//
//
//
/**
 * Set post message target - useful for unit tests.
 *
 * @internal
 */
export const setHost = (h) => {
    host = h;
};
/**
 * @internal
 */
export function setConfig(product, validReceivedPostEvents) {
    config = { product, validReceivedPostEvents };
}
/**
 * @internal
 */
export function addListener(listener, target = window) {
    const receiver = receiveListener(listener);
    receivers.push({ listener, receiver });
    target.addEventListener("message", receiver, false);
}
/**
 * @internal
 */
export function removeListener(listener, target = window) {
    const receiverObj = receivers.find((r) => r.listener === listener);
    if (receiverObj) {
        receivers.splice(receivers.indexOf(receiverObj), 1);
        target.removeEventListener("message", receiverObj.receiver);
    }
}
/**
 * @internal
 */
export function postEvent(product, name, data, contextId) {
    if (!host.postMessage) {
        return;
    }
    host.postMessage({
        gdc: {
            product,
            event: { name, data, contextId },
        },
    }, "*");
}
//# sourceMappingURL=messagingUtils.js.map