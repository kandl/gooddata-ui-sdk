// (C) 2022 GoodData Corporation
import { idRef, isColorPaletteItem } from "@gooddata/sdk-model";
export const unwrapColorPaletteContent = (value) => {
    var _a;
    return (_a = value === null || value === void 0 ? void 0 : value.colorPalette) !== null && _a !== void 0 ? _a : [];
};
export const convertColorPaletteWithLinks = (colorPaletteObject) => {
    const { id, attributes, links } = colorPaletteObject;
    const colorPalette = getColorPaletteFromMDObject(colorPaletteObject);
    return {
        id,
        ref: idRef(id),
        title: attributes.name,
        colorPalette: isValidColorPalette(colorPalette) ? colorPalette : [],
        uri: links.self,
        description: "",
        type: "colorPalette",
        production: false,
        unlisted: false,
        deprecated: false,
    };
};
export const getColorPaletteFromMDObject = ({ attributes, }) => {
    return unwrapColorPaletteContent(attributes.content);
};
export const isValidColorPalette = (colorPalette) => {
    return colorPalette && Array.isArray(colorPalette) && colorPalette.every(isColorPaletteItem);
};
export const convertColorPalette = ({ data: { id, attributes, type }, links, }) => convertColorPaletteWithLinks({ id, attributes, links, type });
//# sourceMappingURL=ColorPaletteConverter.js.map