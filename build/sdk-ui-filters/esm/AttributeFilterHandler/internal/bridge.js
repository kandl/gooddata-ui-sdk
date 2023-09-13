// (C) 2022-2023 GoodData Corporation
import { invariant } from "ts-invariant";
import compact from "lodash/compact.js";
import { actions, createAttributeFilterHandlerStore, selectAttribute, selectElements, selectElementsTotalCount, selectElementsTotalCountWithCurrentSettings, selectAttributeFilter, selectSearch, selectWorkingSelection, selectCommittedSelection, selectElementsCache, getElementsByKeys, selectAttributeStatus, selectAttributeError, selectInitStatus, selectInitError, selectLoadInitialElementsPageStatus, selectLoadInitialElementsPageError, selectLoadNextElementsPageStatus, selectLoadNextElementsPageError, selectLimitingMeasures, selectLimitingAttributeFilters, selectLimitingDateFilters, selectLimit, selectOrder, selectInvertableCommittedSelection, selectInvertableWorkingSelection, selectIsWorkingSelectionChanged, selectIsWorkingSelectionEmpty, selectOffset, selectIsLoadElementsOptionsChanged, selectLimitingAttributeFiltersAttributes, selectInitTotalCountStatus, selectInitTotalCountError, } from "./redux/index.js";
import { newAttributeFilterCallbacks } from "./callbacks.js";
/**
 * @internal
 */
export class AttributeFilterReduxBridge {
    constructor(config) {
        this.initializeBridge = () => {
            this.callbacks = newAttributeFilterCallbacks();
            this.redux = createAttributeFilterHandlerStore(Object.assign(Object.assign({}, this.config), { eventListener: (action, select) => {
                    this.callbacks.eventListener(action, select);
                } }));
        };
        //
        // Init
        //
        this.init = (correlation) => {
            this.redux.dispatch(actions.init({
                correlation,
            }));
        };
        this.getInitStatus = () => {
            return this.redux.select(selectInitStatus);
        };
        this.getInitError = () => {
            return this.redux.select(selectInitError);
        };
        this.onInitStart = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.initStart);
        };
        this.onInitSuccess = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.initSuccess);
        };
        this.onInitError = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.initError);
        };
        this.onInitCancel = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.initCancel);
        };
        // total count init
        this.initTotalCount = (correlation) => {
            this.redux.dispatch(actions.initTotalCount({
                correlation,
            }));
        };
        this.getInitTotalCountStatus = () => {
            return this.redux.select(selectInitTotalCountStatus);
        };
        this.getInitTotalCountError = () => {
            return this.redux.select(selectInitTotalCountError);
        };
        this.onInitTotalCountStart = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.initTotalCountStart);
        };
        this.onInitTotalCountSuccess = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.initTotalCountSuccess);
        };
        this.onInitTotalCountError = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.initTotalCountError);
        };
        this.onInitTotalCountCancel = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.initTotalCountCancel);
        };
        //
        // Attribute
        //
        this.loadAttribute = (correlation) => {
            this.redux.dispatch(actions.loadAttributeRequest({ correlation: correlation }));
        };
        this.cancelAttributeLoad = () => {
            this.redux.dispatch(actions.loadAttributeCancelRequest());
        };
        this.getAttribute = () => {
            return this.redux.select(selectAttribute);
        };
        this.getAttributeStatus = () => {
            return this.redux.select(selectAttributeStatus);
        };
        this.getAttributeError = () => {
            return this.redux.select(selectAttributeError);
        };
        this.onLoadAttributeStart = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadAttributeStart);
        };
        this.onLoadAttributeSuccess = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadAttributeSuccess);
        };
        this.onLoadAttributeError = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadAttributeError);
        };
        this.onLoadAttributeCancel = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadAttributeCancel);
        };
        //
        // Initial elements page
        //
        this.loadInitialElementsPage = (correlation) => {
            this.redux.dispatch(actions.loadInitialElementsPageRequest({ correlation: correlation }));
        };
        this.cancelInitialElementsPageLoad = () => {
            this.redux.dispatch(actions.loadInitialElementsPageCancelRequest());
        };
        this.getInitialElementsPageStatus = () => {
            return this.redux.select(selectLoadInitialElementsPageStatus);
        };
        this.getInitialElementsPageError = () => {
            return this.redux.select(selectLoadInitialElementsPageError);
        };
        this.onLoadInitialElementsPageStart = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadInitialElementsPageStart);
        };
        this.onLoadInitialElementsPageSuccess = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadInitialElementsPageSuccess);
        };
        this.onLoadInitialElementsPageError = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadInitialElementsPageError);
        };
        this.onLoadInitialElementsPageCancel = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadInitialElementsPageCancel);
        };
        //
        // Next elements page
        //
        this.loadNextElementsPage = (correlation) => {
            this.redux.dispatch(actions.loadNextElementsPageRequest({ correlation: correlation }));
        };
        this.getNextElementsPageStatus = () => {
            return this.redux.select(selectLoadNextElementsPageStatus);
        };
        this.getNextElementsPageError = () => {
            return this.redux.select(selectLoadNextElementsPageError);
        };
        this.onLoadNextElementsPageStart = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadNextElementsPageStart);
        };
        this.onLoadNextElementsPageSuccess = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadNextElementsPageSuccess);
        };
        this.onLoadNextElementsPageError = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadNextElementsPageError);
        };
        this.onLoadNextElementsPageCancel = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadNextElementsPageCancel);
        };
        //
        // Custom elements
        //
        this.loadCustomElements = (options, correlation) => {
            this.redux.dispatch(actions.loadCustomElementsRequest({ options, correlation: correlation }));
        };
        this.onLoadCustomElementsStart = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadCustomElementsStart);
        };
        this.onLoadCustomElementsSuccess = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadCustomElementsSuccess);
        };
        this.onLoadCustomElementsError = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadCustomElementsError);
        };
        this.onLoadCustomElementsCancel = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.loadCustomElementsCancel);
        };
        //
        // Elements options
        //
        this.getOffset = () => {
            return this.redux.select(selectOffset);
        };
        this.setSearch = (search) => {
            this.redux.dispatch(actions.setSearch({ search }));
        };
        this.getSearch = () => {
            return this.redux.select(selectSearch);
        };
        this.setLimit = (limit) => {
            this.redux.dispatch(actions.setLimit({ limit }));
        };
        this.getLimit = () => {
            return this.redux.select(selectLimit);
        };
        this.setOrder = (order) => {
            this.redux.dispatch(actions.setOrder({ order }));
        };
        this.getOrder = () => {
            return this.redux.select(selectOrder);
        };
        this.setLimitingMeasures = (filters) => {
            this.redux.dispatch(actions.setLimitingMeasures({ filters }));
        };
        this.getLimitingMeasures = () => {
            return this.redux.select(selectLimitingMeasures);
        };
        this.setLimitingAttributeFilters = (filters) => {
            this.redux.dispatch(actions.setLimitingAttributeFilters({ filters }));
        };
        this.getLimitingAttributeFilters = () => {
            return this.redux.select(selectLimitingAttributeFilters);
        };
        this.setLimitingDateFilters = (filters) => {
            this.redux.dispatch(actions.setLimitingDateFilters({ filters }));
        };
        this.getLimitingDateFilters = () => {
            return this.redux.select(selectLimitingDateFilters);
        };
        //
        // Elements
        //
        this.getAllElements = () => {
            return this.redux.select(selectElements);
        };
        this.getElementsByKey = (keys) => {
            const elementsCache = this.redux.select(selectElementsCache);
            return getElementsByKeys(keys, elementsCache);
        };
        this.getTotalCount = () => {
            return this.redux.select(selectElementsTotalCount);
        };
        this.getTotalCountWithCurrentSettings = () => {
            return this.redux.select(selectElementsTotalCountWithCurrentSettings);
        };
        this.getLimitingAttributeFiltersAttributes = () => {
            return this.redux.select(selectLimitingAttributeFiltersAttributes);
        };
        //
        // Multi select
        //
        this.changeMultiSelection = ({ keys, isInverted }) => {
            this.redux.dispatch(actions.changeSelection({
                selection: keys,
                isInverted,
            }));
        };
        this.revertMultiSelection = () => {
            this.redux.dispatch(actions.revertSelection());
        };
        this.commitMultiSelection = () => {
            this.redux.dispatch(actions.commitSelection());
        };
        this.invertMultiSelection = () => {
            this.redux.dispatch(actions.invertSelection());
        };
        this.clearMultiSelection = () => {
            this.redux.dispatch(actions.clearSelection());
        };
        this.getWorkingMultiSelection = () => {
            return this.redux.select(selectInvertableWorkingSelection);
        };
        this.getCommittedMultiSelection = () => {
            return this.redux.select(selectInvertableCommittedSelection);
        };
        // Single select
        this.changeSingleSelection = (selection) => {
            this.redux.dispatch(actions.changeSelection({
                isInverted: false,
                selection: compact([selection]),
            }));
        };
        this.revertSingleSelection = () => {
            this.redux.dispatch(actions.revertSelection());
        };
        this.commitSingleSelection = () => {
            this.redux.dispatch(actions.commitSelection());
        };
        this.getWorkingSingleSelection = () => {
            const [element, ...maybeMoreElements] = this.redux.select(selectWorkingSelection);
            invariant(!maybeMoreElements.length, "Trying to invoke single select method, but multiple elements are selected.");
            return element;
        };
        this.getCommittedSingleSelection = () => {
            const [element, ...maybeMoreElements] = this.redux.select(selectCommittedSelection);
            invariant(!maybeMoreElements.length, "Trying to invoke single select method, but multiple elements are selected.");
            return element;
        };
        this.onMultiSelectionChanged = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.selectionChanged);
        };
        this.onMultiSelectionCommitted = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.selectionCommitted);
        };
        this.onSingleSelectionChanged = (cb) => {
            return this.callbacks.registerCallback(({ selection }) => cb({ selection: selection.keys[0] }), this.callbacks.registrations.selectionChanged);
        };
        this.onSingleSelectionCommitted = (cb) => {
            return this.callbacks.registerCallback(({ selection }) => cb({ selection: selection.keys[0] }), this.callbacks.registrations.selectionCommitted);
        };
        //
        // Selection
        //
        this.getIsWorkingSelectionEmpty = () => {
            return this.redux.select(selectIsWorkingSelectionEmpty);
        };
        this.getIsWorkingSelectionChanged = () => {
            return this.redux.select(selectIsWorkingSelectionChanged);
        };
        //
        // Filter
        //
        this.getFilter = () => {
            return this.redux.select(selectAttributeFilter);
        };
        this.onUpdate = (cb) => {
            return this.callbacks.registerCallback(cb, this.callbacks.registrations.update);
        };
        this.isLoadElementsOptionsChanged = () => {
            return this.redux.select(selectIsLoadElementsOptionsChanged);
        };
        this.config = config;
        this.initializeBridge();
    }
    cancelNextElementsPageLoad() {
        this.redux.dispatch(actions.loadNextElementsPageCancelRequest());
    }
    cancelCustomElementsLoad(correlation) {
        this.redux.dispatch(actions.loadCustomElementsCancelRequest({ correlation: correlation }));
    }
}
//# sourceMappingURL=bridge.js.map