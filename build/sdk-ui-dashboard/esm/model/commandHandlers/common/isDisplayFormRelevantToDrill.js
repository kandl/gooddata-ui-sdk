// (C) 2021-2022 GoodData Corporation
import { isDrillFromAttribute, areObjRefsEqual, } from "@gooddata/sdk-model";
import { getLocalIdentifierOrDie, getValidDrillOriginAttributes, } from "../../../_staging/drills/drillingUtils.js";
export function isDisplayFormRelevantToDrill(drillDefinition, availableDrillTargets, displayForm) {
    var _a, _b;
    const attributeRef = isDrillFromAttribute(drillDefinition.origin)
        ? (_a = drillDefinition.origin) === null || _a === void 0 ? void 0 : _a.attribute
        : (_b = drillDefinition.origin) === null || _b === void 0 ? void 0 : _b.measure;
    const localId = getLocalIdentifierOrDie(attributeRef);
    const relevantAttributes = getValidDrillOriginAttributes(availableDrillTargets, localId);
    return relevantAttributes.some((attribute) => areObjRefsEqual(displayForm.attribute, attribute.attributeHeader.formOf));
}
//# sourceMappingURL=isDisplayFormRelevantToDrill.js.map