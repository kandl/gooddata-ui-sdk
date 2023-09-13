import { AttributeFilterLoader } from "./loader.js";
/**
 * @internal
 */
export class MultiSelectAttributeFilterHandler extends AttributeFilterLoader {
    constructor(config) {
        super(config);
        // manipulators
        this.changeSelection = (selection) => {
            this.bridge.changeMultiSelection(selection);
        };
        this.revertSelection = () => {
            this.bridge.revertMultiSelection();
        };
        this.commitSelection = () => {
            this.bridge.commitMultiSelection();
        };
        this.invertSelection = () => {
            this.bridge.invertMultiSelection();
        };
        this.clearSelection = () => {
            this.bridge.clearMultiSelection();
        };
        // selectors
        this.getWorkingSelection = () => {
            return this.bridge.getWorkingMultiSelection();
        };
        this.isWorkingSelectionEmpty = () => {
            return this.bridge.getIsWorkingSelectionEmpty();
        };
        this.isWorkingSelectionChanged = () => {
            return this.bridge.getIsWorkingSelectionChanged();
        };
        this.getCommittedSelection = () => {
            return this.bridge.getCommittedMultiSelection();
        };
        // callbacks
        this.onSelectionChanged = (cb) => {
            return this.bridge.onMultiSelectionChanged(cb);
        };
        this.onSelectionCommitted = (cb) => {
            return this.bridge.onMultiSelectionCommitted(cb);
        };
    }
}
//# sourceMappingURL=multiSelectHandler.js.map