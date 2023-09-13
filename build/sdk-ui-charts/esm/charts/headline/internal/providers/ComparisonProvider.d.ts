import React from "react";
import { IBucket } from "@gooddata/sdk-model";
import { IHeadlineTransformationProps } from "../../HeadlineProvider.js";
import AbstractProvider from "./AbstractProvider.js";
import { IComparison } from "../../../../interfaces/index.js";
declare class ComparisonProvider extends AbstractProvider {
    private readonly comparison;
    constructor(comparison: IComparison);
    getHeadlineTransformationComponent(): React.ComponentType<IHeadlineTransformationProps>;
    protected prepareBuckets(originalBuckets: IBucket[]): IBucket[];
    private prepareVirtualArithmeticBucket;
    private createVirtualArithmeticMeasures;
}
export default ComparisonProvider;
//# sourceMappingURL=ComparisonProvider.d.ts.map