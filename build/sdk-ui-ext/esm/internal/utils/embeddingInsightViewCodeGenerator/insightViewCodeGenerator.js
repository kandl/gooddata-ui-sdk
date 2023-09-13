// (C) 2022 GoodData Corporation
import { insightId, insightTitle } from "@gooddata/sdk-model";
import { getReactEmbeddingCodeGenerator, } from "../embeddingCodeGenerator/index.js";
import { removeUseless } from "../removeUseless.js";
import { configForInsightView, localeForInsightView } from "./insightViewConfig.js";
const getInsightViewSpecification = (includeConfiguration = true) => {
    return {
        component: {
            importType: "named",
            name: "InsightView",
            package: "@gooddata/sdk-ui-ext",
        },
        insightToProps: (insightDefinition, ctx) => {
            const insightConfig = {
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
                locale: localeForInsightView(ctx),
            };
            if (includeConfiguration) {
                insightConfig.config = configForInsightView(insightDefinition);
            }
            return insightConfig;
        },
    };
};
/**
 * generate the insight view embedded code
 *
 * @internal
 */
export const insightViewEmbeddedCodeGenerator = getReactEmbeddingCodeGenerator(getInsightViewSpecification(false));
/**
 * DO NOT USE THIS INSIGHTVIEW CODE GENERATOR, IT'S FOR INTERNAL PURPOSE ONLY.
 *
 * @internal
 */
export const insightViewCodeGenerator = getReactEmbeddingCodeGenerator(getInsightViewSpecification());
//# sourceMappingURL=insightViewCodeGenerator.js.map