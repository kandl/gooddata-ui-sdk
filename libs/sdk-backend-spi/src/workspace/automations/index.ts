// (C) 2023-2024 GoodData Corporation

import { IAutomationMetadataObject, IAutomationMetadataObjectDefinition } from "@gooddata/sdk-model";

/**
 * This service provides access to workspace automations.
 *
 * @alpha
 */
export interface IWorkspaceAutomationService {
    /**
     * Get all automations
     *
     * @returns Promise resolved with array of automations.
     * @throws In case of error.
     *
     */
    getAutomations(): Promise<IAutomationMetadataObject[]>;

    /**
     * Get atuomation by id
     *
     * @param id - id of the automation
     * @returns Promise resolved with automation definition
     */
    getAutomation(id: string): Promise<IAutomationMetadataObject>;

    /**
     * Create new automation
     *
     * @param automation - definition of the automation
     * @returns Promise resolved with created automation.
     */
    createAutomation(automation: IAutomationMetadataObjectDefinition): Promise<IAutomationMetadataObject>;

    /**
     * Update existing automation
     *
     * @param automation - definition of the automation
     * @returns Promise resolved when the automation is updated.
     */
    updateAutomation(automation: IAutomationMetadataObject): Promise<IAutomationMetadataObject>;

    /**
     * Delete automation
     *
     * @param id - id of the automation
     * @returns Promise resolved when the automation is deleted.
     */
    deleteAutomation(id: string): Promise<void>;
}
