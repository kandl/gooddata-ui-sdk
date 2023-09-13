import { IDashboardMetadataObject } from "@gooddata/sdk-model";
interface IGraphNode {
    id: string;
    type: string;
    title?: string;
}
/**
 * Graph entities do not hold uri information, so if uri is needed, it has
 * to be constructed from object id somehow.
 */
export declare const convertGraphEntityNodeToAnalyticalDashboard: (node: IGraphNode) => IDashboardMetadataObject;
export {};
//# sourceMappingURL=GraphConverter.d.ts.map