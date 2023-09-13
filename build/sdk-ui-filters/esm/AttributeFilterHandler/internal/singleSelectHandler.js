// (C) 2022 GoodData Corporation
import { filterObjRef, newNegativeAttributeFilter, newPositiveAttributeFilter, filterAttributeElements, isAttributeElementsByRef, isPositiveAttributeFilter, } from "@gooddata/sdk-model";
import { AttributeFilterLoader } from "./loader.js";
/**
 * @internal
 */
export class SingleSelectAttributeFilterHandler extends AttributeFilterLoader {
    static sanitizeConfig(config) {
        const elements = filterAttributeElements(config.attributeFilter);
        const keys = isAttributeElementsByRef(elements) ? elements.uris : elements.values;
        const firstItem = keys[0];
        const sanitizedItems = isAttributeElementsByRef(elements)
            ? { uris: [firstItem] }
            : { values: [firstItem] };
        return Object.assign(Object.assign({}, config), { attributeFilter: isPositiveAttributeFilter(config.attributeFilter)
                ? newPositiveAttributeFilter(filterObjRef(config.attributeFilter), sanitizedItems)
                : newNegativeAttributeFilter(filterObjRef(config.attributeFilter), sanitizedItems) });
    }
    constructor(config) {
        super(SingleSelectAttributeFilterHandler.sanitizeConfig(config));
        // manipulators
        this.changeSelection = (selection) => {
            this.bridge.changeSingleSelection(selection);
        };
        this.revertSelection = () => {
            this.bridge.revertSingleSelection();
        };
        this.commitSelection = () => {
            this.bridge.commitSingleSelection();
        };
        // selectors
        this.getWorkingSelection = () => {
            return this.bridge.getWorkingSingleSelection();
        };
        this.isWorkingSelectionEmpty = () => {
            return this.bridge.getIsWorkingSelectionEmpty();
        };
        this.isWorkingSelectionChanged = () => {
            return this.bridge.getIsWorkingSelectionChanged();
        };
        this.getCommittedSelection = () => {
            return this.bridge.getCommittedSingleSelection();
        };
        // callbacks
        this.onSelectionChanged = (cb) => {
            return this.bridge.onSingleSelectionChanged(cb);
        };
        this.onSelectionCommitted = (cb) => {
            return this.bridge.onSingleSelectionCommitted(cb);
        };
    }
}
//# sourceMappingURL=singleSelectHandler.js.map