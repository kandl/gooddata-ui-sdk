/**
 * Internal interface that contains JWT fields accessed by the authentication provider.
 * There can be other field (claims) in the token payload as well but these are not important for the
 * provider right now.
 */
export interface IJsonWebTokenPayload {
    /**
     * Number of seconds since the start of epoch when the token will expire.
     */
    exp: number;
    /**
     * Subject to which the token grants the access (ID of the Tiger user in our case).
     */
    sub: string;
}
/**
 * Decode provided JWT payload
 *
 * @param jwt - JWT that should be decoded. Expected JWT structure is "header.payload.signature".
 *
 * @returns object with claims decoded from provided JWT payload
 *
 * @throws when provided jwt is empty
 */
export declare const decodeJwtPayload: (jwt: string) => IJsonWebTokenPayload;
/**
 * Compare subject from the new and previous JWT and compare if the subject is the same for both ("sub" claim)
 *
 * @param newJwt - new JWT
 * @param previousJwt - previous JWT
 *
 * @throws when "sub" claim does not equal in both compared JWTs
 */
export declare const validateJwt: (newJwt: string, previousJwt: string) => void;
/**
 * Compute number of milliseconds till provided JWT expiration from the current time.
 * The returned value can be used for setTimeout function.
 *
 * @param jwt - JWT from which the expiration timestamp is extracted
 * @param secondsBeforeTokenExpirationToCallReminder - number of seconds subtracted from the final timeout
 * @param currentTimeInMilliseconds - current time in milliseconds
 *
 * @returns number of milliseconds between now and expiration of provided JWT, subtracted by provided number of seconds
 */
export declare const computeExpirationReminderTimeout: (jwt: string, secondsBeforeTokenExpirationToCallReminder: number, currentTimeInMilliseconds: number) => number;
//# sourceMappingURL=jwt.d.ts.map