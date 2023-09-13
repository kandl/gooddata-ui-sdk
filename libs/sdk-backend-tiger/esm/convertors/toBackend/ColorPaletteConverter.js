export const wrapColorPaletteContent = (colorPalette) => ({ colorPalette });
export const convertColorPalette = (id, colorPalette) => {
    return {
        type: "colorPalette",
        id,
        attributes: {
            name: colorPalette.title || "",
            content: wrapColorPaletteContent(colorPalette.colorPalette),
        },
    };
};
//# sourceMappingURL=ColorPaletteConverter.js.map