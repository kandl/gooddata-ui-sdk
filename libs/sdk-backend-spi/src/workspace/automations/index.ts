// (C) 2023-2024 GoodData Corporation

import { IAutomationMdObject, IAutomationMdObjectDefinition } from "@gooddata/sdk-model";

/**
 * This service provides access to workspace automations.
 *
 * @alpha
 */
export interface IWorkspaceAutomationService {
    /**
     * Get all automations
     *
     * @returns Promise resolved with array of atuomations.
     * @throws In case of error.
     */
    getAutomations(): Promise<IAutomationMdObject[]>;

    /**
     * Get atuomation by id
     *
     * @param id - id of the automation
     * @returns Promise resolved with automation definition
     */
    getAutomation(id: string): Promise<IAutomationMdObject>;

    /**
     * Create new automation
     *
     * @param automation - definition of the automation
     * @returns Promise resolved with created automation.
     */
    createAutomation(automation: IAutomationMdObjectDefinition): Promise<IAutomationMdObject>;

    /**
     * Update existing automation
     *
     * @param automation - definition of the automation
     * @returns Promise resolved when the automation is updated.
     */
    updateAutomation(automation: IAutomationMdObject): Promise<IAutomationMdObject>;

    /**
     * Delete automation
     *
     * @param id - id of the automation
     * @returns Promise resolved when the automation is deleted.
     */
    deleteAutomation(id: string): Promise<void>;
}
