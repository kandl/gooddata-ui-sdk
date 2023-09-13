/**
 * @internal
 */
export interface IShortenTextOptions {
    maxLength?: number;
}
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
export declare function shortenText(value: string, options?: IShortenTextOptions): string;
/**
 * Escapes special characters used in regular expressions.
 * @param value - string to be escaped
 * @returns escaped regular expression
 *
 * @internal
 */
export declare function escapeRegExp(value: string): string;
/**
 * Generates pseudo-random string.
 *
 * @param len - length of string to be generated
 * @returns random string
 *
 * @internal
 */
export declare function randomString(len: number): string;
/**
 * Replaces non-alphanumerical characters with underscore and lower-cases all characters.
 *
 * @param value - string to perform replacement on
 * @returns simplified string
 *
 * @internal
 */
export declare function simplifyText(value: string | number | null): string;
/**
 * Parse string in a form of [foo, bar] to an array of objects.
 * Assume alphanumeric strings in the array and spaces; if some is not alphanumeric , return null
 * @param str - input string with the array definition
 * @returns parsed array of strings
 *
 * @internal
 */
export declare function parseStringToArray(str: string): string[] | null;
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
export declare function hashCodeString(value: string): number;
//# sourceMappingURL=stringUtils.d.ts.map