import { getContext } from "redux-saga/effects";
/**
 * @internal
 */
export function* getAttributeFilterContext() {
    return yield getContext("attributeFilterContext");
}
//# sourceMappingURL=sagas.js.map