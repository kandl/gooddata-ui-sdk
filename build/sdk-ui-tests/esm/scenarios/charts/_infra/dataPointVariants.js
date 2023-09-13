// (C) 2007-2019 GoodData Corporation
const ConfigVariants = [
    ["default", {}],
    ["auto visibility", { dataPoints: { visible: "auto" } }],
    ["forced visible", { dataPoints: { visible: true } }],
    ["forced hidden", { dataPoints: { visible: false } }],
];
export function dataPointCustomizer(baseName, baseProps) {
    return ConfigVariants.map(([variantName, dataPointOverlay]) => {
        return [
            `${baseName} - ${variantName}`,
            { ...baseProps, config: { ...baseProps.config, ...dataPointOverlay } },
        ];
    });
}
//# sourceMappingURL=dataPointVariants.js.map