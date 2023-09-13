// (C) 2022 GoodData Corporation
import { v4 as uuid } from "uuid";
import { invariant } from "ts-invariant";
import { AttributeFilterReduxBridge } from "./bridge.js";
/**
 * @internal
 */
export class AttributeFilterLoader {
    constructor(config) {
        this.validateStaticElementsLoad = () => {
            var _a, _b, _c, _d, _e, _f;
            invariant(!(((_a = this.config.staticElements) === null || _a === void 0 ? void 0 : _a.length) && ((_b = this.getLimitingAttributeFilters()) === null || _b === void 0 ? void 0 : _b.length)), "Using limitingAttributeFilters is not supported when using static attribute elements");
            invariant(!(((_c = this.config.staticElements) === null || _c === void 0 ? void 0 : _c.length) && ((_d = this.getLimitingDateFilters()) === null || _d === void 0 ? void 0 : _d.length)), "Using limitingDateFilters is not supported when using static attribute elements");
            invariant(!(((_e = this.config.staticElements) === null || _e === void 0 ? void 0 : _e.length) && ((_f = this.getLimitingMeasures()) === null || _f === void 0 ? void 0 : _f.length)), "Using limitingMeasures is not supported when using static attribute elements");
        };
        //
        // Init
        //
        this.init = (correlation = uuid()) => {
            this.validateStaticElementsLoad();
            this.bridge.init(correlation);
        };
        this.onInitStart = (cb) => {
            return this.bridge.onInitStart(cb);
        };
        this.onInitSuccess = (cb) => {
            return this.bridge.onInitSuccess(cb);
        };
        this.onInitError = (cb) => {
            return this.bridge.onInitError(cb);
        };
        this.onInitCancel = (cb) => {
            return this.bridge.onInitCancel(cb);
        };
        this.getInitStatus = () => {
            return this.bridge.getInitStatus();
        };
        this.getInitError = () => {
            return this.bridge.getInitError();
        };
        //
        // Init total count
        //
        this.initTotalCount = (correlation = uuid()) => {
            this.bridge.initTotalCount(correlation);
        };
        this.getInitTotalCountStatus = () => {
            return this.bridge.getInitTotalCountStatus();
        };
        this.getInitTotalCountError = () => {
            return this.bridge.getInitTotalCountError();
        };
        this.onInitTotalCountStart = (cb) => {
            return this.bridge.onInitTotalCountStart(cb);
        };
        this.onInitTotalCountSuccess = (cb) => {
            return this.bridge.onInitTotalCountSuccess(cb);
        };
        this.onInitTotalCountError = (cb) => {
            return this.bridge.onInitTotalCountError(cb);
        };
        this.onInitTotalCountCancel = (cb) => {
            return this.bridge.onInitTotalCountCancel(cb);
        };
        //
        // Attribute
        //
        this.loadAttribute = (correlation = uuid()) => {
            this.bridge.loadAttribute(correlation);
        };
        this.cancelAttributeLoad = () => {
            this.bridge.cancelAttributeLoad();
        };
        this.getAttribute = () => {
            return this.bridge.getAttribute();
        };
        this.getAttributeError = () => {
            return this.bridge.getAttributeError();
        };
        this.getAttributeStatus = () => {
            return this.bridge.getAttributeStatus();
        };
        this.onLoadAttributeStart = (cb) => {
            return this.bridge.onLoadAttributeStart(cb);
        };
        this.onLoadAttributeSuccess = (cb) => {
            return this.bridge.onLoadAttributeSuccess(cb);
        };
        this.onLoadAttributeError = (cb) => {
            return this.bridge.onLoadAttributeError(cb);
        };
        this.onLoadAttributeCancel = (cb) => {
            return this.bridge.onLoadAttributeCancel(cb);
        };
        // Initial elements page
        this.loadInitialElementsPage = (correlation = uuid()) => {
            invariant(this.bridge.getInitStatus() === "success", "Cannot call loadInitialElementsPage() before successful initialization.");
            this.validateStaticElementsLoad();
            this.bridge.loadInitialElementsPage(correlation);
        };
        this.getInitialElementsPageStatus = () => {
            return this.bridge.getInitialElementsPageStatus();
        };
        this.getInitialElementsPageError = () => {
            return this.bridge.getInitialElementsPageError();
        };
        this.onLoadInitialElementsPageStart = (cb) => {
            return this.bridge.onLoadInitialElementsPageStart(cb);
        };
        this.onLoadInitialElementsPageSuccess = (cb) => {
            return this.bridge.onLoadInitialElementsPageSuccess(cb);
        };
        this.onLoadInitialElementsPageError = (cb) => {
            return this.bridge.onLoadInitialElementsPageError(cb);
        };
        this.onLoadInitialElementsPageCancel = (cb) => {
            return this.bridge.onLoadInitialElementsPageCancel(cb);
        };
        //
        // Next elements page
        //
        this.loadNextElementsPage = (correlation = uuid()) => {
            invariant(this.bridge.getInitStatus() === "success", "Cannot call loadNextElementsPage() before successful initialization.");
            invariant(this.bridge.getInitialElementsPageStatus() === "success", "Cannot call loadNextElementsPage() before loadInitialElementsPage() completes.");
            invariant(!this.bridge.isLoadElementsOptionsChanged(), "Cannot call loadNextElementsPage() when load element options were changed. When options are changed, you should call loadInitialElementsPage() first.");
            this.bridge.loadNextElementsPage(correlation);
        };
        this.getNextElementsPageStatus = () => {
            return this.bridge.getNextElementsPageStatus();
        };
        this.getNextElementsPageError = () => {
            return this.bridge.getNextElementsPageError();
        };
        this.onLoadNextElementsPageStart = (cb) => {
            return this.bridge.onLoadNextElementsPageStart(cb);
        };
        this.onLoadNextElementsPageSuccess = (cb) => {
            return this.bridge.onLoadNextElementsPageSuccess(cb);
        };
        this.onLoadNextElementsPageError = (cb) => {
            return this.bridge.onLoadNextElementsPageError(cb);
        };
        this.onLoadNextElementsPageCancel = (cb) => {
            return this.bridge.onLoadNextElementsPageCancel(cb);
        };
        //
        // Custom elements
        //
        this.loadCustomElements = (options, correlation) => {
            this.bridge.loadCustomElements(options, correlation);
        };
        this.onLoadCustomElementsStart = (cb) => {
            return this.bridge.onLoadCustomElementsStart(cb);
        };
        this.onLoadCustomElementsSuccess = (cb) => {
            return this.bridge.onLoadCustomElementsSuccess(cb);
        };
        this.onLoadCustomElementsError = (cb) => {
            return this.bridge.onLoadCustomElementsError(cb);
        };
        this.onLoadCustomElementsCancel = (cb) => {
            return this.bridge.onLoadCustomElementsCancel(cb);
        };
        // Elements options
        this.getOffset = () => {
            return this.bridge.getOffset();
        };
        this.setSearch = (search) => {
            this.bridge.setSearch(search);
        };
        this.getSearch = () => {
            return this.bridge.getSearch();
        };
        this.setLimit = (limit) => {
            this.bridge.setLimit(limit);
        };
        this.getLimit = () => {
            return this.bridge.getLimit();
        };
        this.setOrder = (order) => {
            this.bridge.setOrder(order);
        };
        this.getOrder = () => {
            return this.bridge.getOrder();
        };
        this.setLimitingMeasures = (measures) => {
            this.bridge.setLimitingMeasures(measures);
        };
        this.getLimitingMeasures = () => {
            return this.bridge.getLimitingMeasures();
        };
        this.setLimitingAttributeFilters = (filters) => {
            this.bridge.setLimitingAttributeFilters(filters);
        };
        this.getLimitingAttributeFilters = () => {
            return this.bridge.getLimitingAttributeFilters();
        };
        this.setLimitingDateFilters = (filters) => {
            this.bridge.setLimitingDateFilters(filters);
        };
        this.getLimitingDateFilters = () => {
            return this.bridge.getLimitingDateFilters();
        };
        this.getAllElements = () => {
            return this.bridge.getAllElements();
        };
        this.getElementsByKey = (keys) => {
            return this.bridge.getElementsByKey(keys);
        };
        this.getTotalElementsCount = () => {
            return this.bridge.getTotalCount();
        };
        this.getTotalElementsCountWithCurrentSettings = () => {
            return this.bridge.getTotalCountWithCurrentSettings();
        };
        this.getLimitingAttributeFiltersAttributes = () => {
            return this.bridge.getLimitingAttributeFiltersAttributes();
        };
        this.getFilter = () => {
            return this.bridge.getFilter();
        };
        this.onUpdate = (cb) => {
            return this.bridge.onUpdate(cb);
        };
        this.config = config;
        this.bridge = new AttributeFilterReduxBridge(config);
    }
    cancelInitialElementsPageLoad() {
        this.bridge.cancelInitialElementsPageLoad();
    }
    cancelNextElementsPageLoad() {
        this.bridge.cancelNextElementsPageLoad();
    }
    cancelCustomElementsLoad(correlation) {
        this.bridge.cancelCustomElementsLoad(correlation);
    }
}
//# sourceMappingURL=loader.js.map