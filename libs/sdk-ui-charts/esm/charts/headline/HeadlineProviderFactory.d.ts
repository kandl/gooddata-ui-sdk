import { IBucket } from "@gooddata/sdk-model";
import { IChartConfig } from "../../interfaces/index.js";
import { IHeadlineProvider } from "./HeadlineProvider.js";
/**
 * Factory method to create a specific HeadlineProvider based on the provided buckets and chart configuration.
 *
 * @returns An instance of the IHeadlineProvider interface that corresponds headline business.
 *
 * @internal
 */
declare const createHeadlineProvider: (buckets: IBucket[], config: IChartConfig, enableNewHeadline: boolean) => IHeadlineProvider;
/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disapppear.
 */
export { createHeadlineProvider };
//# sourceMappingURL=HeadlineProviderFactory.d.ts.map