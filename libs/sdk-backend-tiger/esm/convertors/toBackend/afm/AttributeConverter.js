// (C) 2020-2023 GoodData Corporation
import { toLabelQualifier } from "../ObjRefConverter.js";
export function convertAttribute(attribute, idx) {
    const { displayForm, alias, showAllValues } = attribute.attribute;
    const aliasProp = alias ? { alias } : {};
    const showAllValuesProp = showAllValues ? { showAllValues } : {};
    return Object.assign(Object.assign({ label: toLabelQualifier(displayForm), localIdentifier: attribute.attribute.localIdentifier || `a${idx + 1}` }, aliasProp), showAllValuesProp);
}
//# sourceMappingURL=AttributeConverter.js.map