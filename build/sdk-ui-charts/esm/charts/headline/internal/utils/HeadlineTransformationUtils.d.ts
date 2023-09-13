import { IDataView } from "@gooddata/sdk-backend-spi";
import { IntlShape } from "react-intl";
import { DataViewFacade, HeadlineElementType, IDrillEvent, IHeaderPredicate } from "@gooddata/sdk-ui";
import { DataValue, Identifier, IMeasureDescriptor } from "@gooddata/sdk-model";
import { IHeadlineData, IHeadlineDataItem } from "../interfaces/Headlines.js";
export interface IHeadlineExecutionData {
    measureHeaderItem: IMeasureDescriptor["measureHeaderItem"];
    value: DataValue;
}
export interface IHeadlineDrillItemContext {
    localIdentifier: Identifier;
    value: string;
    element: HeadlineElementType;
}
export declare function createHeadlineDataItem(executionDataItem: IHeadlineExecutionData, isDrillable?: boolean): IHeadlineDataItem;
export declare function getExecutionData(dv: DataViewFacade): IHeadlineExecutionData[];
/**
 * Get {@link IHeadlineData} used by the {@link Headline} component.
 *
 * @param dataView - data to visualize
 * @param intl - Required localization for compare item title
 */
export declare function getHeadlineData(dataView: IDataView, intl: IntlShape): IHeadlineData;
/**
 * Take headline data and apply list of drillable items.
 * The method will return copied collection of the headline data with altered drillable status.
 *
 * @param headlineData - The headline data that we want to change the drillable status.
 * @param drillableItems - list of drillable items
 * @param dataView - data visualized by the headline
 * @returns altered headlineData
 */
export declare function applyDrillableItems(headlineData: IHeadlineData, drillableItems: IHeaderPredicate[], dataView: IDataView): IHeadlineData;
/**
 * Build drill event data (object with execution and drill context) from the data obtained by clicking on the {@link Headline}
 * component an from the execution objects.
 *
 * @param itemContext - data received from the click on the {@link Headline} component.
 * @param dataView - data visualized by the headline
 */
export declare function buildDrillEventData(itemContext: IHeadlineDrillItemContext, dataView: IDataView): IDrillEvent;
//# sourceMappingURL=HeadlineTransformationUtils.d.ts.map