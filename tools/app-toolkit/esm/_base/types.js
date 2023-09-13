// (C) 2021-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * This error is thrown when input validation fails.
 */
export class InputValidationError extends Error {
    constructor(inputName, value, message) {
        super(message);
        this.inputName = inputName;
        this.value = value;
        this.type = "IVE";
        // restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
/**
 * Type guard testing whether object is a type of {@link InputValidationError}.
 */
export function isInputValidationError(obj) {
    return !isEmpty(obj) && obj.type === "IVE";
}
//# sourceMappingURL=types.js.map