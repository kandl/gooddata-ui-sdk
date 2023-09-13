import { IColumnsAndDefinitions, IVisualizationObjectContent } from "@gooddata/api-model-bear";
import { XhrModule } from "../xhr.js";
/**
 * Module for execution on experimental execution resource
 *
 * @deprecated The module is in maintenance mode only (just the the compilation issues are being fixed when
 *      referenced utilities and interfaces are being changed) and is not being extended when AFM executor
 *      have new functionality added.
 */
export declare class ExperimentalExecutionsModule {
    private xhr;
    private loadAttributesMap;
    constructor(xhr: XhrModule, loadAttributesMap: any);
    /**
     * For the given projectId it returns table structure with the given
     * elements in column headers.
     *
     * @param projectId - GD project identifier
     * @param columns - An array of attribute or metric identifiers.
     * @param executionConfiguration - Execution configuration - can contain for example
     *                 property "where" containing query-like filters
     *                 property "orderBy" contains array of sorted properties to order in form
     *                      `[{column: 'identifier', direction: 'asc|desc'}]`
     * @param settings - Supports additional settings accepted by the underlying
     *                             xhr.ajax() calls
     *
     * @returns Structure with `headers` and `rawData` keys filled with values from execution.
     */
    getData(projectId: string, columns: any[], executionConfiguration?: any, settings?: any): Promise<any>;
    mdToExecutionDefinitionsAndColumns(projectId: string, mdObj: IVisualizationObjectContent, options?: {
        attributesMap?: Record<string, unknown>;
        removeDateItems?: boolean;
    }): Promise<IColumnsAndDefinitions>;
    private getAttributesMap;
    private loadExtendedDataResults;
}
//# sourceMappingURL=experimental-executions.d.ts.map