import { IInsightDefinition } from "@gooddata/sdk-model";
import { ILocale } from "@gooddata/sdk-ui";
import { IChartConfig } from "@gooddata/sdk-ui-charts";
import { IGeoConfig } from "@gooddata/sdk-ui-geo";
import { IEmbeddingCodeContext } from "../../interfaces/VisualizationDescriptor";
import { PropWithMeta } from "../embeddingCodeGenerator";
/**
 * @internal
 */
export declare function configForInsightView(insight: IInsightDefinition): PropWithMeta<IGeoConfig | IChartConfig> | undefined;
export declare function localeForInsightView(ctx: IEmbeddingCodeContext): PropWithMeta<ILocale> | undefined;
//# sourceMappingURL=insightViewConfig.d.ts.map