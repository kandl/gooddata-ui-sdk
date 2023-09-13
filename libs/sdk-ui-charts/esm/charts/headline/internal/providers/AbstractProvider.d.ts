/// <reference types="react" />
import { IExecutionFactory, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { IBucket } from "@gooddata/sdk-model";
import { ICreateExecutionParams, IHeadlineProvider, IHeadlineTransformationProps } from "../../HeadlineProvider.js";
declare abstract class AbstractProvider implements IHeadlineProvider {
    createExecution(executionFactory: IExecutionFactory, params: ICreateExecutionParams): IPreparedExecution;
    abstract getHeadlineTransformationComponent(): React.ComponentType<IHeadlineTransformationProps>;
    protected prepareBuckets(originalBuckets: IBucket[]): IBucket[];
}
export default AbstractProvider;
//# sourceMappingURL=AbstractProvider.d.ts.map