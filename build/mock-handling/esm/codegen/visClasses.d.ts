import { OptionalKind, VariableStatementStructure } from "ts-morph";
import { VisClassesRecording } from "../recordings/visClasses.js";
/**
 * Generate constants for visClasses recording. This function will return non-exported constant per recording.
 *
 * @param recording - recording to generate constants for
 * @param targetDir - absolute path to directory where index will be stored, this is needed so that paths can be
 *   made relative for require()
 */
export declare function generateConstantsForVisClasses(recording: VisClassesRecording | null, targetDir: string): Array<OptionalKind<VariableStatementStructure>>;
//# sourceMappingURL=visClasses.d.ts.map