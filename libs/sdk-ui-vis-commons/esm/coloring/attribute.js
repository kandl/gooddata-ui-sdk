import { ColorStrategy, getAttributeColorAssignment } from "./base.js";
/**
 * @internal
 */
export class AttributeColorStrategy extends ColorStrategy {
    createColorAssignment(colorPalette, colorMapping, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    viewByAttribute, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    stackByAttribute, dv) {
        const attribute = stackByAttribute ? stackByAttribute : viewByAttribute;
        const colorAssignment = getAttributeColorAssignment(attribute, colorPalette, colorMapping, dv);
        return {
            fullColorAssignment: colorAssignment,
        };
    }
}
//# sourceMappingURL=attribute.js.map