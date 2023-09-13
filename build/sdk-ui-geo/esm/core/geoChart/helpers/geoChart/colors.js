import isString from "lodash/isString.js";
import range from "lodash/range.js";
function formatColor(red, green, blue, opacity = 1) {
    if (opacity === 1) {
        return `rgb(${red},${green},${blue})`;
    }
    return `rgba(${red},${green},${blue},${opacity})`;
}
function parseRGBColorCode(color) {
    const f = color.split(",");
    const R = parseInt(f[0].slice(4), 10);
    const G = parseInt(f[1], 10);
    const B = parseInt(f[2], 10);
    return { R, G, B };
}
function getCalculatedChannel(channel, index, step) {
    return Math.trunc(channel + index * step);
}
function getCalculatedColors(count, channels, steps, opacity = 1) {
    return range(1, count).map((index) => formatColor(getCalculatedChannel(channels[0], index, steps[0]), getCalculatedChannel(channels[1], index, steps[1]), getCalculatedChannel(channels[2], index, steps[2]), opacity));
}
function getRGBColorCode(color) {
    if (isString(color)) {
        const { R: r, G: g, B: b } = parseRGBColorCode(color);
        return {
            r,
            g,
            b,
        };
    }
    return color;
}
export function getColorPalette(baseColor, opacity = 1) {
    const colorItemsCount = 6;
    const { r, g, b } = getRGBColorCode(baseColor);
    const channels = [r, g, b];
    const steps = channels.map((channel) => (255 - channel) / colorItemsCount);
    const generatedColors = getCalculatedColors(colorItemsCount, channels, steps, opacity);
    return [...generatedColors.reverse(), formatColor(r, g, b, opacity)];
}
export function rgbToRgba(color, opacity = 1) {
    const { R, G, B } = parseRGBColorCode(color);
    return formatColor(R, G, B, opacity);
}
//# sourceMappingURL=colors.js.map