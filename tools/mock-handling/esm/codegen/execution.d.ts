import { OptionalKind, VariableStatementStructure } from "ts-morph";
import { ExecutionRecording } from "../recordings/execution.js";
/**
 * Generate constants for the execution recordings. This function will return non-exported constant per recording
 * and then also an exported 'Scenarios' constant that is a map from vis ⇒ scenario ⇒ recording.
 * When encounters duplicate entries, favors the newer ones and replace the older one.
 *
 * @param recordings - recordings to generate constants for
 * @param targetDir - absolute path to directory where index will be stored, this is needed so that paths can be
 *   made relative for require()
 */
export declare function generateConstantsForExecutions(recordings: ExecutionRecording[], targetDir: string): Array<OptionalKind<VariableStatementStructure>>;
//# sourceMappingURL=execution.d.ts.map