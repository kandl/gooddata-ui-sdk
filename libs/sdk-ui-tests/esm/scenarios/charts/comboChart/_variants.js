const AllExplicitCombinations = [
    ["column", "column"],
    ["area", "area"],
    ["line", "line"],
    ["column", "line"],
    ["line", "column"],
    ["column", "area"],
    ["area", "column"],
    ["line", "area"],
    ["area", "line"],
];
export function comboVariants(baseName, baseProps) {
    return AllExplicitCombinations.map((c) => [
        baseName + c.join("-"),
        {
            ...baseProps,
            config: { primaryChartType: c[0], secondaryChartType: c[1] },
        },
    ]);
}
//# sourceMappingURL=_variants.js.map