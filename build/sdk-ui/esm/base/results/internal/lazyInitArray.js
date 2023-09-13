var _a;
// (C) 2019-2020 GoodData Corporation
import { invariant } from "ts-invariant";
/**
 * Simple implementation of fixed-size arrays with lazily initialized elements.
 */
export class LazyInitArray {
    constructor(size, initializer) {
        this.get = (idx) => {
            invariant(idx >= 0 && idx < this.data.length, `array index out of bounds: ${idx}`);
            if (!this.data[idx]) {
                this.data[idx] = this.initializer(idx);
            }
            return this.data[idx];
        };
        this[_a] = () => {
            let idx = 0;
            const length = this.data.length;
            const get = this.get;
            return {
                next() {
                    if (idx >= length) {
                        return {
                            done: true,
                            value: undefined,
                        };
                    }
                    const value = get(idx);
                    idx += 1;
                    return {
                        done: false,
                        value,
                    };
                },
            };
        };
        invariant(size >= 0, `array size must be non-negative, got: ${size}`);
        this.data = new Array(size);
        this.initializer = initializer;
    }
}
_a = Symbol.iterator;
//# sourceMappingURL=lazyInitArray.js.map