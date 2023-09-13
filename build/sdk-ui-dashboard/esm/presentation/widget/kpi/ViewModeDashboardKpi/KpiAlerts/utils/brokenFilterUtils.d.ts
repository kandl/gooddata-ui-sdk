import { IDataSetMetadataObject, IAttributeElement } from "@gooddata/sdk-model";
import { IntlShape } from "react-intl";
import { IBrokenAlertFilter } from "../types.js";
import { IBrokenAlertFilterBasicInfo } from "../../../../../../model/index.js";
interface IAttributeFilterMeta {
    validElements: IAttributeElement[];
    totalElementsCount: number;
    title: string;
}
export type IAttributeFilterMetaCollection = {
    [ref: string]: IAttributeFilterMeta;
};
/**
 * Takes basic broken alert info and adds additional information used for displaying of such filters to the user.
 *
 * @param brokenAlertFilters - the basic broken alert filters info to enrich
 * @param intl - the intl object used
 * @param dateFormat - the date format to be used
 * @param dateDataSets - all available date data sets
 * @param attributeFiltersMeta - additional information about attribute filters (see {@link IAttributeFilterMetaCollection} for details)
 */
export declare function enrichBrokenAlertsInfo(brokenAlertFilters: IBrokenAlertFilterBasicInfo[], intl: IntlShape, dateFormat: string, dateDataSets: IDataSetMetadataObject[], attributeFiltersMeta: IAttributeFilterMetaCollection): IBrokenAlertFilter[];
export {};
