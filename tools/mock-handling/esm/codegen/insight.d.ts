import { OptionalKind, VariableStatementStructure } from "ts-morph";
import { InsightRecording } from "../recordings/insights.js";
/**
 * Generate constants for insight recordings. This function will return non-exported constant per recording.
 *
 * @param recordings - recordings to generate constants for
 * @param targetDir - absolute path to directory where index will be stored, this is needed so that paths can be
 *   made relative for require()
 */
export declare function generateConstantsForInsights(recordings: InsightRecording[], targetDir: string): Array<OptionalKind<VariableStatementStructure>>;
//# sourceMappingURL=insight.d.ts.map