import React from "react";
/**
 * @internal
 */
export interface IEllipsisTextProps {
    text: string;
    maxLines?: number;
}
/**
 * Multiline ellipsis does not exist natively, so this is a simple version of it.
 *
 * The component cuts the text at approximately 'maxLines' lines.
 * It renders button 'Show more'/'Show less'.
 * The new line character poses the most trouble to calculate the cut point,
 * so it will estimate how much character worth of space was taken by it.
 *
 * There is several constants: the width is taken as 190px, the font-size is
 * 13px. The text is wrapped by words, so 28 characters is an approximate count
 * per line. By these metrics it can find a point to shorten the text. It is not
 * precise value, but it works most of the time, sometimes rendering 9 or 11 lines,
 * which is acceptable for this component usage.
 *
 * @internal
 */
export declare const EllipsisText: React.FC<IEllipsisTextProps>;
//# sourceMappingURL=EllipsisText.d.ts.map