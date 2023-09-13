import isEmpty from "lodash/isEmpty.js";
/**
 * @alpha
 */
export function isWarningMessage(obj) {
    return !isEmpty(obj) && !!obj.severity;
}
//# sourceMappingURL=typings.js.map