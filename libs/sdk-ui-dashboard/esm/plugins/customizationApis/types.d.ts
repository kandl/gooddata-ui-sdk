export type CustomizerMutationsContext = {
    insight: CustomizerMutationsType[];
    kpi: CustomizerMutationsType[];
    layouts: Record<string, CustomizerMutationsType>;
};
export type CustomizerMutationsType = "tag" | "provider" | "body" | "decorator" | "inserted";
export declare function createCustomizerMutationsContext(): CustomizerMutationsContext;
