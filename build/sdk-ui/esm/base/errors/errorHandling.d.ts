import { IntlShape } from "react-intl";
import { GoodDataSdkError } from "./GoodDataSdkError.js";
/**
 * Mapping between error code and human readable description of the error.
 *
 * Key is error code as defined in {@link ErrorCodes}.
 *
 * @public
 */
export interface IErrorDescriptors {
    [key: string]: {
        icon?: string;
        message: string;
        description: string;
    };
}
/**
 * Returns a new, localized error code descriptors.
 *
 * @param intl - localizations
 * @returns always new instance
 * @public
 */
export declare function newErrorMapping(intl: IntlShape): IErrorDescriptors;
/**
 * Converts any error into an instance of {@link GoodDataSdkError}.
 *
 * @remarks
 * The conversion logic right now focuses mostly on errors that are contractually specified in Analytical Backend SPI.
 * All other unexpected errors are wrapped into an exception with the generic 'UNKNOWN_ERROR' code.
 *
 * Instances of GoodDataSdkError are returned as-is and are not subject to any processing.
 *
 * @param error - error to convert
 * @returns new instance of GoodDataSdkError
 * @public
 */
export declare function convertError(error: unknown): GoodDataSdkError;
/**
 * Default error handler - logs error to console as error.
 *
 * @param error - error to log
 * @public
 */
export declare function defaultErrorHandler(error: unknown): void;
//# sourceMappingURL=errorHandling.d.ts.map