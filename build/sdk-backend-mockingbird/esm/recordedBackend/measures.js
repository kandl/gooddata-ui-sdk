// (C) 2019-2022 GoodData Corporation
import { NotSupported, } from "@gooddata/sdk-backend-spi";
/**
 * @internal
 */
export class RecordedMeasures {
    getMeasureExpressionTokens(_) {
        throw new NotSupported("not supported");
    }
    createMeasure(_) {
        throw new NotSupported("not supported");
    }
    deleteMeasure(_) {
        throw new NotSupported("not supported");
    }
    updateMeasure(_) {
        throw new NotSupported("not supported");
    }
    getMeasureReferencingObjects(_) {
        throw new NotSupported("not supported");
    }
}
//# sourceMappingURL=measures.js.map