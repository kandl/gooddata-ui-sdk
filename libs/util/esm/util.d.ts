/**
 * This package contains utility functions used in production or test code of multiple different GoodData.UI packages.
 *
 * @remarks
 * The functions exported from here are not part of the GoodData.UI public API.
 *
 * @packageDocumentation
 */

declare namespace arrayUtils {
    export {
        shiftArrayRight
    }
}
export { arrayUtils }

/**
 * Returns combine guard from input guards as a result type is union type of guarded types
 * Its good for array filtering base on multiple guards and its return correct result union type
 *
 * @internal
 */
declare function combineGuards<T extends ((x: unknown) => x is unknown)[]>(...guards: T): (x: unknown) => x is GuardType<T[number]>;

/**
 * Returns a promise which will resolve after the provided number of milliseconds.
 *
 * @param timeout - resolve timeout in milliseconds
 * @internal
 */
declare function delay(timeout?: number): Promise<void>;

/**
 * Escapes special characters used in regular expressions.
 * @param value - string to be escaped
 * @returns escaped regular expression
 *
 * @internal
 */
declare function escapeRegExp(value: string): string;

/**
 * @internal
 */
declare type GuardType<T> = T extends (o: unknown) => o is infer U ? U : never;

/**
 * Returns a hash code for a string.
 *
 * The hash code for a string object is computed as
 *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * using number arithmetic, where s[i] is the i th character
 * of the given string, n is the length of the string,
 * and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 * @param value - s a string
 * @returns a hash code value for the given string.
 *
 * @internal
 */
declare function hashCodeString(value: string): number;

/**
 * @internal
 */
declare interface IShortenTextOptions {
    maxLength?: number;
}

declare namespace objectUtils {
    export {
        shallowEqualObjects
    }
}
export { objectUtils }

/**
 * Parse string in a form of [foo, bar] to an array of objects.
 * Assume alphanumeric strings in the array and spaces; if some is not alphanumeric , return null
 * @param str - input string with the array definition
 * @returns parsed array of strings
 *
 * @internal
 */
declare function parseStringToArray(str: string): string[] | null;

/**
 * Generates pseudo-random string.
 *
 * @param len - length of string to be generated
 * @returns random string
 *
 * @internal
 */
declare function randomString(len: number): string;

/**
 * Given an object containing the parsed translation bundle, this function creates a new object which contains
 * only key → value mapping between translation key and the actual value.
 *
 * @param translationsWithMetadata - parsed translation bundle
 * @internal
 */
declare function removeMetadata(translationsWithMetadata: Record<string, any>): Record<string, string>;

/**
 * Handles difference between GD locale and moment.js locale identifiers
 *
 * @param intlLocale - locale identifier
 * @internal
 */
declare const sanitizeLocaleForMoment: (intlLocale: string) => string;

/**
 * @internal
 */
declare function shallowEqualObjects(objA: Record<string, any>, objB: Record<string, any>): boolean;

/**
 * Shift array once to the right
 *
 * @param array - some array
 * @internal
 */
declare function shiftArrayRight<T>(array: Array<T>): Array<T>;

/**
 * Shortens string if it exceeds maximum length. If the shortening occurs, the ellipsis char will
 * be added at the end.
 *
 * @param value - string to be shortened
 * @param options - currently only allows you to specify maxLength
 * @returns original string if it does not exceed limits, shortened string otherwise
 *
 * @internal
 */
declare function shortenText(value: string, options?: IShortenTextOptions): string;

/**
 * Replaces non-alphanumerical characters with underscore and lower-cases all characters.
 *
 * @param value - string to perform replacement on
 * @returns simplified string
 *
 * @internal
 */
declare function simplifyText(value: string | number | null): string;

declare namespace stringUtils {
    export {
        shortenText,
        escapeRegExp,
        randomString,
        simplifyText,
        parseStringToArray,
        hashCodeString,
        IShortenTextOptions
    }
}
export { stringUtils }

declare namespace testUtils {
    export {
        delay
    }
}
export { testUtils }

declare namespace translationUtils {
    export {
        removeMetadata,
        sanitizeLocaleForMoment
    }
}
export { translationUtils }

declare namespace typesUtils {
    export {
        combineGuards,
        GuardType
    }
}
export { typesUtils }

export { }
