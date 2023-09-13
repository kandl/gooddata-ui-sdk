import isEmpty from "lodash/isEmpty.js";
export function validateSectionPlacement(layout, index) {
    if (index === -1) {
        return true;
    }
    if (isEmpty(layout.sections) && !index) {
        return true;
    }
    // using <= here so that we can add to the last place not only by using -1 by also by using (lastIndex+1)
    return index <= layout.sections.length;
}
export function validateSectionExists(layout, index) {
    return index > -1 && index < layout.sections.length;
}
export function validateItemPlacement(section, index) {
    if (index === -1) {
        return true;
    }
    if (isEmpty(section.items) && !index) {
        return true;
    }
    // using <= here so that we can add to the last place not only by using -1 by also by using (lastIndex+1)
    return index <= section.items.length;
}
export function validateItemExists(section, index) {
    return index > -1 && index < section.items.length;
}
//# sourceMappingURL=layoutValidation.js.map