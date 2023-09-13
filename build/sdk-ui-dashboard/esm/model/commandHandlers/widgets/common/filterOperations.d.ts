import { ObjRef, IDashboardAttributeFilter, IAnalyticalWidget, ICatalogDateDataset } from "@gooddata/sdk-model";
import { DashboardContext } from "../../../types/commonTypes.js";
import { IDashboardCommand } from "../../../commands/index.js";
import { WidgetFilterOperation } from "../../../types/widgetTypes.js";
import { SagaIterator } from "redux-saga";
/**
 * Result of the filter operation. This is fully resolved variant of filter settings that should be set as-is
 * on the widget.
 */
export interface FilterOpResult {
    /**
     * Date data set (if any) to use for date filtering the widget
     */
    dateDataSet?: ICatalogDateDataset;
    /**
     * Attribute filters to ignore on the widget.
     */
    ignoredFilters?: IDashboardAttributeFilter[];
}
export type DateDatasetValidator<T extends IAnalyticalWidget> = (ctx: DashboardContext, cmd: IDashboardCommand, widget: T, ref: ObjRef) => SagaIterator<ICatalogDateDataset>;
export type AttributeFilterValidator<T extends IAnalyticalWidget> = (ctx: DashboardContext, cmd: IDashboardCommand, widget: T, refs: ObjRef[]) => SagaIterator<IDashboardAttributeFilter[] | undefined>;
export type FilterValidators<T extends IAnalyticalWidget> = {
    dateDatasetValidator: DateDatasetValidator<T>;
    attributeFilterValidator: AttributeFilterValidator<T>;
};
export interface FilterOpCommand extends IDashboardCommand {
    payload: {
        readonly operation: WidgetFilterOperation;
    };
}
/**
 * This is one of the more complex event handlers. Here is a little introduction to make studying easier. You
 * really should read this first because you start messing around here villy-nilly. It can simplify things hopefully.
 *
 * In order to provide rich/convenient API for fiddling with widget filters, the widget filter setting commands
 * allow caller to use different types of operations such as:
 *
 * -  replace filter settings completely
 * -  enable/disable date filter (by setting or unsetting date dataset)
 * -  replace list of attribute filters to ignore
 * -  add/remove one or more items from a list of attribute filters to ignore
 *
 * To keep things sane, the handler opts out for convenient - yet perhaps not optimal approach to implement these
 * operations:
 *
 * 1.  The operation to replace filter settings completely can handle validation and resolution of date dataset
 *     to filter by and attribute filters to ignore. In a way, this is the ultimate operation that can achieve
 *     everything.
 *
 * 2.  All the other operations are just thin wrappers on top of the replace filter settings. The sub-operation always
 *     prepare a 'quasi replace' or 'intermediate replace', call the the replace settings operation and
 *     then either send the results off or tweak them.
 *
 *     The latter is the case for the ignore/unignore one or more attribute filter operations. These cannot be
 *     mapped 1-1 to just the replace. However, the replace operation is still used to do intermediate work/validations.
 *
 *     The result of the intermediate operation is then tweaked. The funniest example is the unignore operation:
 *
 *     -  the intermediate operation is set with the existing date data set setting that is on the widget - this is
 *        because it should be untouched yet we need to perform resolution to catalog date dataset for the
 *        purpose of having nice, rich eventing in the end
 *
 *     -  the intermediate operation is set with attribute filters that should be removed from ignore list. that is
 *        because code needs to verify the input - whether the display form is valid and used in some attribute filter
 *
 *     -  the replace operation does the validations.. it essentially resolves date data set ref to a nice catalog
 *        date dataset info & resolves display form of the filter to remove to an attribute filter to remove
 *
 *     -  the unignore op then fiddles with with existing ignore list and removes the attribute filter that was
 *        validated and resolved by the intermediate replace operation
 */
export declare function processFilterOp(ctx: DashboardContext, validators: FilterValidators<IAnalyticalWidget>, cmd: FilterOpCommand, widget: IAnalyticalWidget): SagaIterator<FilterOpResult>;
