import { IDataView } from "@gooddata/sdk-backend-spi";
import { ExplicitDrill, HeadlineElementType } from "@gooddata/sdk-ui";
import { IHeadlineExecutionData } from "./HeadlineTransformationUtils.js";
import { IBaseHeadlineData, IBaseHeadlineItem } from "../interfaces/BaseHeadlines.js";
export declare function getBaseHeadlineData(dataView: IDataView, drillableItems: ExplicitDrill[]): IBaseHeadlineData;
export declare function createBaseHeadlineItem(executionData: IHeadlineExecutionData, isDrillable: boolean, elementType: HeadlineElementType): IBaseHeadlineItem;
//# sourceMappingURL=BaseHeadlineTransformationUtils.d.ts.map