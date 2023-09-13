import { DashboardContext } from "../../../types/commonTypes.js";
import { IWorkspaceCatalog } from "@gooddata/sdk-backend-spi";
export declare function loadCatalog(ctx: DashboardContext): Promise<IWorkspaceCatalog>;
