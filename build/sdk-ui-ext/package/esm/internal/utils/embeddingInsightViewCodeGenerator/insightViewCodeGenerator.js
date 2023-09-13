// (C) 2022 GoodData Corporation
import { insightId, insightTitle } from "@gooddata/sdk-model";
import { getReactEmbeddingCodeGenerator } from "../embeddingCodeGenerator";
import { removeUseless } from "../removeUseless";
import { configForInsightView, localeForInsightView } from "./insightViewConfig";
/**
 * DO NOT USE THIS INSIGHTVIEW CODE GENERATOR, IT'S FOR INTERNAL PURPOSE ONLY.
 *
 * @internal
 */
export const insightViewCodeGenerator = getReactEmbeddingCodeGenerator({
    component: {
        importType: "named",
        name: "InsightView",
        package: "@gooddata/sdk-ui-ext",
    },
    insightToProps: (insightDefinition, ctx) => {
        return {
            insight: {
                value: insightId(insightDefinition),
                meta: {
                    cardinality: "scalar",
                },
            },
            showTitle: {
                value: insightTitle(insightDefinition),
                meta: {
                    cardinality: "scalar",
                },
            },
            execConfig: {
                value: (ctx === null || ctx === void 0 ? void 0 : ctx.executionConfig) && removeUseless(ctx.executionConfig),
                meta: {
                    cardinality: "scalar",
                    typeImport: {
                        importType: "named",
                        name: "IExecutionConfig",
                        package: "@gooddata/sdk-model",
                    },
                },
            },
            config: configForInsightView(insightDefinition),
            locale: localeForInsightView(ctx),
        };
    },
});
//# sourceMappingURL=insightViewCodeGenerator.js.map