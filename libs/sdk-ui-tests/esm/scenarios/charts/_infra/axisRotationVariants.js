import cloneDeep from "lodash/cloneDeep.js";
const ConfigVariants = [["90"], ["-90"], ["60"], ["-60"]];
function updateAxisSettings(rotation, config = {}) {
    const copy = cloneDeep(config);
    if (copy.xaxis) {
        copy.xaxis.rotation = rotation;
    }
    if (copy.secondary_xaxis) {
        copy.secondary_xaxis.rotation = rotation;
    }
    return copy;
}
export function axisRotationVariants(baseName, baseProps) {
    return ConfigVariants.map(([rotation]) => {
        /*
         * stories use the scenario name as story name. the minus sign messes things up and would lead
         * to duplicate stories..
         */
        return [
            `${baseName} - ${rotation.replace("-", "minus")}`,
            { ...baseProps, config: updateAxisSettings(rotation, baseProps.config) },
        ];
    });
}
//# sourceMappingURL=axisRotationVariants.js.map