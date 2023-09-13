import { IInsightDefinition, IWidgetDefinition } from "@gooddata/sdk-model";
/**
 * @internal
 */
export type ColorMapping = {
    color: {
        type: "guid";
        value: string;
    };
    id: string | null;
};
export declare function fixInsightLegacyElementUris(insight: IInsightDefinition): IInsightDefinition;
export declare function fixWidgetLegacyElementUris(widget: IWidgetDefinition): IWidgetDefinition;
//# sourceMappingURL=fixLegacyElementUris.d.ts.map