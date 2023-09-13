import { DashboardSelector } from "../types.js";
import { ObjRef } from "@gooddata/sdk-model";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap.js";
import { IDrillTargets } from "./drillTargetsTypes.js";
/**
 * Return all widgets drill targets
 * @alpha
 */
export declare const selectDrillTargets: DashboardSelector<ObjRefMap<IDrillTargets>>;
/**
 * Selects drill targets by widget ref.
 *
 * @alpha
 */
export declare const selectDrillTargetsByWidgetRef: (ref: ObjRef) => DashboardSelector<IDrillTargets | undefined>;
