import { PayloadAction } from "@reduxjs/toolkit";
import { IInsight, IDateFilterConfig, IAttributeDisplayFormMetadataObject, IWidget, IDashboardLayout, IDashboard, ISettings } from "@gooddata/sdk-model";
import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../../types/commonTypes.js";
import { ObjRefMap } from "../../../../_staging/metadata/objRefMap.js";
export declare const EmptyDashboardLayout: IDashboardLayout<IWidget>;
/**
 * Returns a list of actions which when processed will initialize the essential parts of the dashboard
 * state so that it shows a new, empty dashboard.
 *
 * @param dateFilterConfig - date filter config to use for the new dashboard
 */
export declare function actionsToInitializeNewDashboard(dateFilterConfig: IDateFilterConfig): Array<PayloadAction<any>>;
/**
 * Returns a list of actions which when processed will initialize filter context, layout and meta parts
 * of the state for an existing dashboard.
 *
 * This generator will perform the essential cleanup, sanitization and resolution on top of of the input
 * dashboard and use the sanitized values to initialize the state:
 *
 * -  Layout sizing sanitization happens here
 * -  Resolution of attribute filter display forms happens here (this may be async)
 *
 * @param ctx - dashboard context in which the initialization is done
 * @param dashboard - dashboard to create initialization actions for
 * @param insights - insights used on the dashboard; note that this function will not create actions to store
 *  these insights in the state; it uses the insights to perform sanitization of the dashboard layout
 * @param settings - settings currently in effect; note that this function will not create actions to store
 *  the settings in the state; it uses the settings during layout sanitization
 * @param dateFilterConfig - effective date filter config to use; note that this function will not store
 *  the date filter config anywhere; it uses the config during filter context sanitization & determining
 *  which date option is selected
 * @param displayForms - specify display forms that should be used for in-memory resolution of
 *  attribute filter display forms to metadata objects
 * @param persistedDashboard - dashboard to use for the persisted dashboard state slice in case it needs to be different from the dashboard param
 */
export declare function actionsToInitializeExistingDashboard(ctx: DashboardContext, dashboard: IDashboard, insights: IInsight[], settings: ISettings, dateFilterConfig: IDateFilterConfig, displayForms?: ObjRefMap<IAttributeDisplayFormMetadataObject>, persistedDashboard?: IDashboard): SagaIterator<Array<PayloadAction<any>>>;
