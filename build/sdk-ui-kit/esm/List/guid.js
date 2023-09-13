// (C) 2007-2020 GoodData Corporation
// borrowed from Ember
window._gd_uuid = 0;
function getGuid() {
    window._gd_uuid += 1;
    return window._gd_uuid;
}
/**
 * Generate GUID for the object and set it as its '__infID' prop.
 *
 * @param obj - object to set guid to
 * @returns newly generated guid or already existing one on the object, '(Object)' for Object, '(Array)' for Array.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function guidFor(obj) {
    const GUID_KEY = "__infID";
    const GUID_DESC = {
        writable: false,
        configurable: false,
        enumerable: false,
        value: null,
    };
    if (obj[GUID_KEY])
        return obj[GUID_KEY];
    if (obj === Object)
        return "(Object)";
    if (obj === Array)
        return "(Array)";
    const stamp = `gd-guid-${getGuid()}`;
    if (obj[GUID_KEY] === null) {
        obj[GUID_KEY] = stamp;
    }
    else {
        GUID_DESC.value = stamp;
        Object.defineProperty(obj, GUID_KEY, GUID_DESC);
    }
    return stamp;
}
//# sourceMappingURL=guid.js.map