// (C) 2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
export function setOrDelete(object, prop, value) {
    if (isEmpty(value)) {
        delete object[prop];
    }
    else {
        object[prop] = value;
    }
}
//# sourceMappingURL=setOrDelete.js.map