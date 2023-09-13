import { ITigerClient } from "@gooddata/api-client-tiger";
import { CatalogItem } from "@gooddata/sdk-model";
export declare function loadAttributesAndDateDatasetsAndHierarchies(client: ITigerClient, workspaceId: string, rsqlFilter: string, loadAttributes?: boolean, loadDateDatasets?: boolean, loadAttributeHierarchies?: boolean): Promise<CatalogItem[]>;
//# sourceMappingURL=datasetLoader.d.ts.map