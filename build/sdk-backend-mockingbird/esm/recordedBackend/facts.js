// (C) 2019-2022 GoodData Corporation
import { NotSupported } from "@gooddata/sdk-backend-spi";
/**
 * @internal
 */
export class RecordedFacts {
    getFactDatasetMeta(_) {
        throw new NotSupported("not supported");
    }
}
//# sourceMappingURL=facts.js.map