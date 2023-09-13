import { IUserWorkspaceSettings } from "@gooddata/sdk-backend-spi";
import { IFilter, IWidgetDefinition } from "@gooddata/sdk-model";
export declare function isAlertingTemporarilyDisabledForGivenFilter(kpi: IWidgetDefinition, filters: IFilter[], userWorkspaceSettings: IUserWorkspaceSettings | undefined): boolean;
