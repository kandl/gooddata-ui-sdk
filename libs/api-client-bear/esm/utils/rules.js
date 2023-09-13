// (C) 2007-2020 GoodData Corporation
import { invariant } from "ts-invariant";
import find from "lodash/find.js";
import every from "lodash/every.js";
export class Rules {
    constructor() {
        this.rules = [];
    }
    addRule(tests, callback) {
        this.rules.push([tests, callback]);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    match(subject, params) {
        const [, callback] = find(this.rules, ([tests]) => every(tests, (test) => test(subject, params)));
        invariant(callback, "No suitable rule to handle the parameters found.");
        return callback;
    }
}
//# sourceMappingURL=rules.js.map