/**
 * Log an info message. Use these to communicate what the tool done, what is about to do, give additional
 * explanation and so on.
 *
 */
export declare function logInfo(message: string): void;
/**
 * Log a warning. Use these to communicate that either something seems amiss (but the tool can continue) or
 * to communicate info that may be surprising (good example is --dry-run mode. end the dry run with warning
 * because user may forget/miss that she has --dry-run on CLI and may be surprised that nothing actually
 * happens)
 *
 */
export declare function logWarn(message: string): void;
/**
 * Log message communicating success. Use scarcely, typically at the end of command processing. Success message
 * may include summary info & details about the great success that just occurred. Also emojis.
 */
export declare function logSuccess(message: string): void;
/**
 * Log an error. Use for validation errors and runtime errors.
 */
export declare function logError(message: string): void;
//# sourceMappingURL=loggers.d.ts.map