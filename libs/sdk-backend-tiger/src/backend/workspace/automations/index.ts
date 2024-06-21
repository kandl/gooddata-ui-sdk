// (C) 2023-2024 GoodData Corporation

import { ITigerClient } from "@gooddata/api-client-tiger";
import { IAutomationMetadataObject, IAutomationMetadataObjectDefinition } from "@gooddata/sdk-model";
import {
    IAutomationsQuery,
    IWorkspaceAutomationService,
    IWorkspaceAutomationsQueryOptions,
} from "@gooddata/sdk-backend-spi";

import { convertAutomation as convertAutomationFromBackend } from "../../../convertors/fromBackend/AutomationConverter.js";
import { convertAutomation as convertAutomationToBackend } from "../../../convertors/toBackend/AutomationConverter.js";
import {
    convertExportDefinitionMdObjectDefinition as convertExportDefinitionMdObjectDefinitionToBackend,
    // convertExportDefinitionMdObject as convertExportDefinitionMdObjectToBackend,
} from "../../../convertors/toBackend/ExportDefinitionsConverter.js";
import { AutomationsQuery } from "./automationsQuery.js";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";

export class TigerWorkspaceAutomationService implements IWorkspaceAutomationService {
    constructor(
        private readonly authCall: TigerAuthenticatedCallGuard,
        private readonly workspaceId: string,
    ) {}

    public getAutomationsQuery = (): IAutomationsQuery => {
        return new AutomationsQuery(this.authCall, {
            workspaceId: this.workspaceId,
        });
    };

    public getAutomations = async (
        options?: IWorkspaceAutomationsQueryOptions,
    ): Promise<IAutomationMetadataObject[]> => {
        const includeUser = options?.loadUserData ? ["createdBy" as const, "modifiedBy" as const] : [];
        return this.authCall(async (client: ITigerClient) => {
            const result = await client.entities.getAllEntitiesAutomations({
                workspaceId: this.workspaceId,
                include: ["notificationChannel", "recipients", "exportDefinitions", ...includeUser],
            });

            const automations = result.data?.data || [];
            return automations.map((automation) =>
                convertAutomationFromBackend(automation, result.data.included ?? []),
            );
        });
    };

    public getAutomation = async (id: string): Promise<IAutomationMetadataObject> => {
        return this.authCall(async (client: ITigerClient) => {
            const result = await client.entities.getEntityAutomations({
                objectId: id,
                workspaceId: this.workspaceId,
                include: ["notificationChannel", "recipients", "exportDefinitions"],
            });
            return convertAutomationFromBackend(result.data.data, result.data.included ?? []);
        });
    };

    public createAutomation = async (
        automation: IAutomationMetadataObjectDefinition,
    ): Promise<IAutomationMetadataObject> => {
        // TODO: create ID in case its not provided
        const convertedExportDefinitions =
            automation.exportDefinitions?.map(convertExportDefinitionMdObjectDefinitionToBackend) ?? [];
        return this.authCall(async (client: ITigerClient) => {
            const createdExportDefinitions = await Promise.all(
                convertedExportDefinitions.map(async (exportDefinition) => {
                    return client.entities.createEntityExportDefinitions({
                        workspaceId: this.workspaceId,
                        jsonApiExportDefinitionPostOptionalIdDocument: exportDefinition,
                    });
                }),
            );
            const createdExportDefinitionsIds = createdExportDefinitions.map(
                (exportDefinition) => exportDefinition.data.data.id,
            );
            const convertedAutomation = convertAutomationToBackend(automation, createdExportDefinitionsIds);
            const result = await client.entities.createEntityAutomations({
                workspaceId: this.workspaceId,
                jsonApiAutomationInDocument: {
                    data: convertedAutomation,
                },
                include: ["notificationChannel", "recipients", "exportDefinitions"],
            });

            return convertAutomationFromBackend(result.data.data, result.data.included ?? []);
        });
    };

    public updateAutomation = async (
        automation: IAutomationMetadataObject,
    ): Promise<IAutomationMetadataObject> => {
        const convertedExportDefinitions =
            automation.exportDefinitions?.map(convertExportDefinitionMdObjectDefinitionToBackend) ?? [];
        return this.authCall(async (client: ITigerClient) => {
            const createdExportDefinitions = await Promise.all(
                convertedExportDefinitions.map(async (exportDefinition) => {
                    return client.entities.createEntityExportDefinitions({
                        workspaceId: this.workspaceId,
                        jsonApiExportDefinitionPostOptionalIdDocument: exportDefinition,
                    });
                }),
            );
            const createdExportDefinitionsIds = createdExportDefinitions.map(
                (exportDefinition) => exportDefinition.data.data.id,
            );
            const convertedAutomation = convertAutomationToBackend(automation, createdExportDefinitionsIds);
            const result = await client.entities.updateEntityAutomations({
                objectId: automation.id,
                workspaceId: this.workspaceId,
                jsonApiAutomationInDocument: {
                    data: convertedAutomation,
                },
                include: ["notificationChannel", "recipients", "exportDefinitions"],
            });
            return convertAutomationFromBackend(result.data.data, result.data.included ?? []);
        });
    };

    public deleteAutomation(id: string): Promise<void> {
        return this.authCall(async (client: ITigerClient) => {
            await client.entities.deleteEntityAutomations({ workspaceId: this.workspaceId, objectId: id });
        });
    }
}
