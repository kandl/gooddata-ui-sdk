// (C) 2007-2023 GoodData Corporation
import { NotSupported, isNoDataError, NoDataError, } from "@gooddata/sdk-backend-spi";
import { decoratedBackend } from "../decoratedBackend/index.js";
import { DecoratedExecutionFactory, DecoratedPreparedExecution } from "../decoratedBackend/execution.js";
import { defFingerprint, } from "@gooddata/sdk-model";
import { Denormalizer, Normalizer } from "./normalizer.js";
import cloneDeep from "lodash/cloneDeep.js";
class WithNormalizationExecutionFactory extends DecoratedExecutionFactory {
    constructor(decorated, config) {
        super(decorated);
        this.config = config;
        this.wrap = (original) => {
            return new NormalizingPreparedExecution(original, this.decorated, this.config);
        };
    }
    forInsightByRef(insight, filters) {
        const isFallbackAllowed = this.config.executeByRefMode === "fallback";
        if (isFallbackAllowed) {
            return this.forInsight(insight, filters);
        }
        throw new NotSupported("Execution by reference is not supported when using normalizing backend. " +
            "Use forInsight() instead.");
    }
}
/**
 * Prepared execution which does normalization. The prepared execution works with the original
 * exec definition all the time. All operations are done on top of it - except for the execution itself.
 *
 * Once the execute() is called, the prepared execution will perform normalization and will prepare execution
 * for the normalized definition. It uses the original, non-normalizing exec factory for this.
 *
 * It thus obtains the normalized execution and starts it, obtaining the normalized result.
 */
class NormalizingPreparedExecution extends DecoratedPreparedExecution {
    constructor(decorated, originalExecutionFactory, config) {
        super(decorated);
        this.originalExecutionFactory = originalExecutionFactory;
        this.config = config;
        this.execute = () => {
            var _a, _b;
            const normalizationState = Normalizer.normalize(this.definition);
            const normalizedExecution = this.originalExecutionFactory.forDefinition(normalizationState.normalized);
            (_b = (_a = this.config).normalizationStatus) === null || _b === void 0 ? void 0 : _b.call(_a, normalizationState);
            return normalizedExecution.execute().then((result) => {
                return new DenormalizingExecutionResult(result, normalizationState, this, this.decorated);
            });
        };
        this.createNew = (decorated) => {
            return new NormalizingPreparedExecution(decorated, this.originalExecutionFactory, this.config);
        };
    }
}
/**
 * An implementation of de-normalizing execution result.
 *
 * It receives the result of normalized execution + normalization metadata, and at
 * construction time sets up the results definition to be the original definition, and
 * then de-normalizes the dimension headers so that they match the original definition.
 *
 * The result instance receives also receives the normalizing execution which triggered creation of
 * the result → this is so that when client calls transform(), they can get back to further customizing the
 * execution.
 *
 * The result instance receives also the original, non-normalizing prepared execution → this is needed
 * because of export(). Exports are a server side thing that must be done for the original execution - because
 * the normalization process normally takes away the essential detail that is important in the exports - such as
 * titles, formats and so on. See the export() implementation - this actually performs the original execution
 * and exports result from it.
 */
class DenormalizingExecutionResult {
    constructor(normalizedResult, normalizationState, normalizingExecution, originalExecution) {
        this.normalizedResult = normalizedResult;
        this.normalizationState = normalizationState;
        this.normalizingExecution = normalizingExecution;
        this.originalExecution = originalExecution;
        this.transform = () => {
            return this.normalizingExecution;
        };
        this.export = async (options) => {
            const originalResult = await this.originalExecution.execute();
            return originalResult.export(options);
        };
        this.readAll = () => {
            const promisedDataView = this.normalizedResult.readAll();
            return promisedDataView
                .then((dataView) => {
                return new DenormalizedDataView(this, dataView, this.denormalizer);
            })
                .catch(this.handleDataViewError);
        };
        this.readWindow = (offset, size) => {
            const promisedDataView = this.normalizedResult.readWindow(offset, size);
            return promisedDataView
                .then((dataView) => {
                return new DenormalizedDataView(this, dataView, this.denormalizer);
            })
                .catch(this.handleDataViewError);
        };
        this.equals = (other) => {
            return this._fingerprint === other.fingerprint();
        };
        this.fingerprint = () => {
            return this._fingerprint;
        };
        this.handleDataViewError = (error) => {
            // make sure that errors with dataViews are repackaged with the dataView denormalized as well
            // otherwise the dataViews will not make sense to the caller
            if (isNoDataError(error) && error.dataView) {
                throw new NoDataError(error.message, new DenormalizedDataView(this, error.dataView, this.denormalizer));
            }
            throw error;
        };
        this.denormalizer = Denormalizer.from(normalizationState);
        this.definition = this.normalizationState.original;
        this.dimensions = this.denormalizer.denormalizeDimDescriptors(normalizedResult.dimensions);
        this._fingerprint = `normalizedResult_${defFingerprint(this.definition)}`;
    }
}
/**
 * Denormalized DataView takes mostly copies of the contents of the normalized data view. The only exception is the
 * header items. The measure headers included therein may have normalized, incorrect measure names (defaulted by
 * backend to localId).
 */
class DenormalizedDataView {
    constructor(result, normalizedDataView, denormalizer) {
        this.normalizedDataView = normalizedDataView;
        this.equals = (other) => {
            return this._fingerprint === other.fingerprint();
        };
        this.fingerprint = () => {
            return this._fingerprint;
        };
        this.result = result;
        this.definition = this.result.definition;
        this.count = cloneDeep(this.normalizedDataView.count);
        this.data = cloneDeep(this.normalizedDataView.data);
        this.headerItems = denormalizer.denormalizeHeaders(this.normalizedDataView.headerItems);
        this.offset = cloneDeep(this.normalizedDataView.offset);
        this.totalCount = cloneDeep(this.normalizedDataView.totalCount);
        this.totals = cloneDeep(this.normalizedDataView.totals);
        this.totalTotals = cloneDeep(this.normalizedDataView.totalTotals);
        this._fingerprint = `${this.result.fingerprint()}/${this.offset.join(",")}-${this.count.join(",")}`;
    }
}
/**
 * Decorates backend with logic which transparently normalizes execution definitions before they are dispatched
 * to the underlying backend. The normalization standardizes local identifiers and removes any fields that do not
 * impact the resulting data itself: aliases, title customizations and measure format customizations.
 *
 * All the detail that is stripped on the way to the execution APIs is restored before the results reach the
 * caller code.
 *
 * The normalization is essential to increase cache hits - be it both on client or on the server.
 *
 * @param realBackend - real backend to decorate
 * @param config - Specify configuration of the normalization process, see {@link NormalizationConfig}
 * @returns new instance of backend
 * @beta
 */
export function withNormalization(realBackend, config = {}) {
    return decoratedBackend(realBackend, {
        execution: (original) => new WithNormalizationExecutionFactory(original, config),
    });
}
//# sourceMappingURL=index.js.map