import { IDataView } from "@gooddata/sdk-backend-spi";
import { Identifier, DataValue } from "@gooddata/sdk-model";
import { HeadlineElementType, IDrillEvent, IHeaderPredicate } from "@gooddata/sdk-ui";
import { IHeadlineData } from "../../../headline/internal/interfaces/Headlines.js";
export interface IXirrExecutionData {
    date: string;
    value: DataValue;
}
export interface IXirrDrillItemContext {
    localIdentifier: Identifier;
    value: string;
    element: HeadlineElementType;
}
/**
 * Get HeadlineData used by the {@link Headline} component.
 *
 * @param dataView - data to visualize
 * @param intl - Required localization for compare item title
 */
export declare function getHeadlineData(dataView: IDataView): IHeadlineData;
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
 * Build drill event data (object with execution and drill context) from the data obtained by clicking on the {@link Xirr}
 * component an from the execution objects.
 *
 * @param itemContext - data received from the click on the {@link Xirr} component.
 * @param dataView - data visualized by the headline
 */
export declare function buildDrillEventData(itemContext: IXirrDrillItemContext, dataView: IDataView): IDrillEvent;
//# sourceMappingURL=XirrTransformationUtils.d.ts.map