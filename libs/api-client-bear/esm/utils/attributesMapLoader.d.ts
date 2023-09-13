import { MetadataModule } from "../metadata.js";
export declare function getMissingUrisInAttributesMap(displayFormsUris: string[], attributesMap: Record<string, unknown>): string[];
export declare class AttributesMapLoaderModule {
    private md;
    constructor(md: MetadataModule);
    loadAttributesMap(projectId: string, attributeDisplayFormUris: string[]): Promise<Record<string, unknown>>;
}
//# sourceMappingURL=attributesMapLoader.d.ts.map