// (C) 2023-2024 GoodData Corporation

import { ITigerClient } from "@gooddata/api-client-tiger";
import { IAutomationMdObject, IAutomationMdObjectDefinition } from "@gooddata/sdk-model";
import { IWorkspaceAutomationService } from "@gooddata/sdk-backend-spi";

import { convertAutomation as convertAutomationFromBackend } from "../../../convertors/fromBackend/AutomationConverter.js";
import { convertAutomation as convertAutomationToBackend } from "../../../convertors/toBackend/AutomationConverter.js";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";

export class TigerWorkspaceAutomationService implements IWorkspaceAutomationService {
    constructor(
        private readonly authCall: TigerAuthenticatedCallGuard,
        private readonly workspaceId: string,
    ) {}

    public getAutomations = async (): Promise<IAutomationMdObject[]> => {
        return this.authCall(async (client: ITigerClient) => {
            const result = await client.entities.getAllEntitiesAutomations({
                workspaceId: this.workspaceId,
            });

            const automations = result.data?.data || [];
            return automations.map((automation) => convertAutomationFromBackend(automation));
        });
    };

    public getAutomation = async (id: string): Promise<IAutomationMdObject> => {
        return this.authCall(async (client: ITigerClient) => {
            const result = await client.entities.getEntityAutomations({
                objectId: id,
                workspaceId: this.workspaceId,
            });
            return convertAutomationFromBackend(result.data.data);
        });
    };

    public createAutomation = async (
        automation: IAutomationMdObjectDefinition,
    ): Promise<IAutomationMdObject> => {
        // TODO: create also export definitions
        return this.authCall(async (client: ITigerClient) => {
            const result = await client.entities.createEntityAutomations({
                workspaceId: this.workspaceId,
                jsonApiAutomationInDocument: {
                    data: convertAutomationToBackend(automation),
                },
            });
            return convertAutomationFromBackend(result.data.data);
        });
    };

    public updateAutomation = async (automation: IAutomationMdObject): Promise<IAutomationMdObject> => {
        // TODO: create also export definitions
        return this.authCall(async (client: ITigerClient) => {
            const result = await client.entities.updateEntityAutomations({
                objectId: automation.id,
                workspaceId: this.workspaceId,
                jsonApiAutomationInDocument: {
                    data: convertAutomationToBackend(automation),
                },
            });
            return convertAutomationFromBackend(result.data.data);
        });
    };

    public deleteAutomation(id: string): Promise<void> {
        return this.authCall(async (client: ITigerClient) => {
            await client.entities.deleteEntityAutomations({ workspaceId: this.workspaceId, objectId: id });
        });
    }
}
