// (C) 2007-2019 GoodData Corporation
import { CustomColorPalette, CustomColors } from "../../_infra/colors.js";
const ConfigVariants = [
    ["default", {}, ["mock-no-insight"]],
    ["custom palette", { colorPalette: CustomColorPalette }],
    ["custom colors", { colors: CustomColors }, ["mock-no-insight"]],
    [
        "custom palette preferred over colors",
        {
            colorPalette: CustomColorPalette,
            colors: CustomColors,
        },
        ["mock-no-insight"],
    ],
];
export function coloringCustomizer(baseName, baseProps, baseTags) {
    return ConfigVariants.map(([variantName, coloringOverlay, tags = []]) => {
        return [
            `${baseName} - ${variantName}`,
            { ...baseProps, config: { ...baseProps.config, ...coloringOverlay } },
            [...baseTags, ...tags],
        ];
    });
}
//# sourceMappingURL=coloringVariants.js.map