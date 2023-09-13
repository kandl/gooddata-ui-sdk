import { ObjRef } from "@gooddata/sdk-model";
import { IDashboardLayoutSectionFacade, IDashboardLayoutItemFacade } from "../../_staging/dashboard/fluidLayout/index.js";
export declare function getRefsForSection(section: IDashboardLayoutSectionFacade<unknown>): (ObjRef | undefined)[];
export declare function getRefsForItem(item: IDashboardLayoutItemFacade<unknown>): (ObjRef | undefined)[];
