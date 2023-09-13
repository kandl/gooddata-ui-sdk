// (C) 2007-2020 GoodData Corporation
/**
 * Return promise that will resolve after `ms` miliseconds
 *
 * @param ms - time in miliseconds
 * @returns
 */
export function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}
//# sourceMappingURL=promise.js.map