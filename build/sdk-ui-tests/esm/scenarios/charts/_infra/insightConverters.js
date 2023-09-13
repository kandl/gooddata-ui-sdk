// (C) 2007-2020 GoodData Corporation
import { insightId, insightProperties, insightSetProperties, insightTitle, isMeasure, measureLocalId, } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
import cloneDeep from "lodash/cloneDeep.js";
function createColorMappingItems(defaultInsight, mapping, ids) {
    const iid = insightId(defaultInsight);
    const title = insightTitle(defaultInsight);
    return mapping.map((m, idx) => {
        const color = m.color;
        const id = ids[idx];
        if (!id) {
            console.warn(`For insight ${title} (${iid}): not all color mappings could be converted to vis properties format.
            Check test scenario definition - you likely have more mappings in the props than input to replaceColorMapping() converter.`);
            return {
                id: "invalid-entry",
                color,
            };
        }
        return {
            id,
            color,
        };
    });
}
/**
 * This will create an insight converter which will replace color mapping visualization property which by default contains
 * color mapping predicates with string identifier of objects.
 *
 * @param valuesOrObjs - mixed array of mapping test values or measures; if measure, localId is extracted and
 *   used as test value
 */
export function replaceMappingPredicates(...valuesOrObjs) {
    const ids = valuesOrObjs.map((e) => {
        if (isMeasure(e)) {
            return measureLocalId(e);
        }
        return e;
    });
    return (defaultInsight) => {
        const properties = insightProperties(defaultInsight);
        const colorMapping = properties?.controls?.colorMapping ?? [];
        if (isEmpty(colorMapping)) {
            return defaultInsight;
        }
        const colorMappingItems = createColorMappingItems(defaultInsight, colorMapping, ids);
        const newProperties = cloneDeep(properties);
        newProperties.controls.colorMapping = colorMappingItems;
        return insightSetProperties(defaultInsight, newProperties);
    };
}
//# sourceMappingURL=insightConverters.js.map