import { OptionalKind, VariableStatementStructure } from "ts-morph";
import { DashboardRecording } from "../recordings/dashboards.js";
/**
 * Generate constants for the dashboard recordings. This function will return non-exported constant per recording.
 *
 * @param recordings - recordings to generate constants for
 * @param targetDir - absolute path to directory where index will be stored, this is needed so that paths can be
 *   made relative for require()
 */
export declare function generateConstantsForDashboards(recordings: DashboardRecording[], targetDir: string): Array<OptionalKind<VariableStatementStructure>>;
//# sourceMappingURL=dashboard.d.ts.map