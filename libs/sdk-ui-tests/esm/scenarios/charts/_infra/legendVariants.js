// (C) 2007-2019 GoodData Corporation
const LegendVariants = [
    ["auto legend", { position: "auto" }],
    ["legend on left", { position: "left" }],
    ["legend on right", { position: "right" }],
    ["legend on top", { position: "top" }],
    ["legend at bottom", { position: "bottom" }],
    ["disabled", { enabled: false }],
];
const LegendVariantForceEnables = [
    ["default legend", {}],
    ["auto legend", { position: "auto", enabled: true }],
    ["legend on left", { position: "left", enabled: true }],
    ["legend on right", { position: "right", enabled: true }],
    ["legend on top", { position: "top", enabled: true }],
    ["legend at bottom", { position: "bottom", enabled: true }],
    ["disabled", { enabled: false }],
];
function buildLegendCustomizer(legendVariants, baseName, baseProps) {
    return legendVariants.map(([variantName, legendConfig]) => {
        return [
            `${baseName} - ${variantName}`,
            { ...baseProps, config: { ...baseProps.config, legend: legendConfig } },
        ];
    });
}
export function legendCustomizer(baseName, baseProps) {
    return buildLegendCustomizer(LegendVariants, baseName, baseProps);
}
export function legendForceEnabledCustomizer(baseName, baseProps) {
    return buildLegendCustomizer(LegendVariantForceEnables, baseName, baseProps);
}
//# sourceMappingURL=legendVariants.js.map