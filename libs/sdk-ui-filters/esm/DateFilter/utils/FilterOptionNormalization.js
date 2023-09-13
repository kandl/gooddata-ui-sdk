// (C) 2007-2021 GoodData Corporation
import { isUiRelativeDateFilterForm } from "../interfaces/index.js";
export function normalizeSelectedFilterOption(selectedFilterOption) {
    if (isUiRelativeDateFilterForm(selectedFilterOption) &&
        selectedFilterOption.from > selectedFilterOption.to) {
        return Object.assign(Object.assign({}, selectedFilterOption), { from: selectedFilterOption.to, to: selectedFilterOption.from });
    }
    return selectedFilterOption;
}
//# sourceMappingURL=FilterOptionNormalization.js.map