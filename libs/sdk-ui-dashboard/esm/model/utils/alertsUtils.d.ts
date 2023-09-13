import { IFilter, IWidgetAlertDefinition, IAttributeDisplayFormMetadataObject, IWidgetDefinition } from "@gooddata/sdk-model";
import { IBrokenAlertFilterBasicInfo } from "../types/alertTypes.js";
import { ObjRefMap } from "../../_staging/metadata/objRefMap.js";
/**
 * Gets the information about the so called broken alert filters. These are filters that are set up on the alert,
 * but the currently applied filters either do not contain them, or the KPI has started ignoring them
 * since the alert was first set up.
 *
 * @param alert - the alert to compute the broken filters for
 * @param kpi - the KPI widget that the alert is relevant to
 * @param appliedFilters - all the currently applied filters (including All Time date filters)
 * @param displayFormsMap - map of all resolved related display forms
 *
 * @internal
 */
export declare function getBrokenAlertFiltersBasicInfo(alert: IWidgetAlertDefinition | undefined, kpi: IWidgetDefinition, appliedFilters: IFilter[], displayFormsMap: ObjRefMap<IAttributeDisplayFormMetadataObject>): IBrokenAlertFilterBasicInfo[];
