// (C) 2019 GoodData Corporation
/**
 * Specifies test scenarios with various invalid inputs for type guards. These scenarios should be
 * tested on all type guards in sdk-model.
 */
export const InvalidInputTestCases = [
    [false, "null", null],
    [false, "undefined", undefined],
    [false, "empty object", {}],
    [false, "array", []],
    [false, "string", "bleh"],
    [false, "number", 42],
    [false, "boolean", true],
    [
        false,
        "function",
        () => {
            // empty, we care only about the fact that this object is a function
        },
    ],
];
//# sourceMappingURL=typeGuards.js.map