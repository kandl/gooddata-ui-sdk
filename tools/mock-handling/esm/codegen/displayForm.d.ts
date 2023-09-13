import { OptionalKind, VariableStatementStructure } from "ts-morph";
import { DisplayFormRecording } from "../recordings/displayForms.js";
/**
 * Generate constants for the valid element recordings. This function will return non-exported constant per recording.
 *
 * @param recordings - recordings to generate constants for
 * @param targetDir - absolute path to directory where index will be stored, this is needed so that paths can be
 *   made relative for require()
 */
export declare function generateConstantsForDisplayForms(recordings: DisplayFormRecording[], targetDir: string): Array<OptionalKind<VariableStatementStructure>>;
//# sourceMappingURL=displayForm.d.ts.map