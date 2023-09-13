import { bucketMeasure, bucketsFind, isPoPMeasure, isPreviousPeriodMeasure, newBucket, newVirtualArithmeticMeasure, } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
import AbstractProvider from "./AbstractProvider.js";
import ComparisonTransformation from "../transformations/ComparisonTransformation.js";
import { CalculateAs } from "../../../../interfaces/index.js";
const ARITHMETIC_BUCKET_IDENTIFIER = "comparison_virtual_arithmetic_bucket";
class ComparisonProvider extends AbstractProvider {
    constructor(comparison) {
        super();
        this.comparison = comparison;
    }
    getHeadlineTransformationComponent() {
        return ComparisonTransformation;
    }
    prepareBuckets(originalBuckets) {
        const arithmeticBucket = this.prepareVirtualArithmeticBucket(originalBuckets);
        return [...originalBuckets, arithmeticBucket];
    }
    prepareVirtualArithmeticBucket(originalBuckets) {
        const primaryBucket = bucketsFind(originalBuckets, BucketNames.MEASURES);
        const primaryMeasure = primaryBucket && bucketMeasure(primaryBucket);
        const secondaryBucket = bucketsFind(originalBuckets, BucketNames.SECONDARY_MEASURES);
        const secondaryMeasures = secondaryBucket && bucketMeasure(secondaryBucket);
        return newBucket(ARITHMETIC_BUCKET_IDENTIFIER, ...this.createVirtualArithmeticMeasures(primaryMeasure, secondaryMeasures));
    }
    createVirtualArithmeticMeasures(primaryMeasure, secondaryMeasure) {
        const createVirtualArithmeticMeasure = (operator) => {
            return newVirtualArithmeticMeasure([primaryMeasure, secondaryMeasure], operator);
        };
        switch (this.comparison.calculationType) {
            case CalculateAs.DIFFERENCE:
                return [createVirtualArithmeticMeasure("difference")];
            case CalculateAs.RATIO:
                return [createVirtualArithmeticMeasure("ratio")];
            case CalculateAs.CHANGE:
                return [createVirtualArithmeticMeasure("change")];
            default:
                if (isPoPMeasure(secondaryMeasure) || isPreviousPeriodMeasure(secondaryMeasure)) {
                    return [createVirtualArithmeticMeasure("change")];
                }
                return [createVirtualArithmeticMeasure("ratio")];
        }
    }
}
export default ComparisonProvider;
//# sourceMappingURL=ComparisonProvider.js.map