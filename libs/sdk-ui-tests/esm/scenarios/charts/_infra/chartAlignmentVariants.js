const ConfigVariants = [
    ["bottom", { chart: { verticalAlign: "bottom" } }],
    ["middle", { chart: { verticalAlign: "middle" } }],
    ["top", { chart: { verticalAlign: "top" } }],
    ["default", {}],
];
export function chartAlignmentVariants(baseName, baseProps) {
    return ConfigVariants.map(([variantName, config]) => {
        return [`${baseName} - ${variantName}`, { ...baseProps, config }];
    });
}
//# sourceMappingURL=chartAlignmentVariants.js.map