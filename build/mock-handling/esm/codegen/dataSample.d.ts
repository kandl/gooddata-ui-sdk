import { OptionalKind, VariableStatementStructure } from "ts-morph";
import { DisplayFormRecording } from "../recordings/displayForms.js";
/**
 * Generate constants for the display form recordings and data sample. This function will return non-exported constant per recording
 * and then also an exported 'DataSamples' constant that is a map from data sample ⇒ display form ⇒ recording.
 *
 * @param recordings - recordings to generate constants for
 * @param targetDir - absolute path to directory where index will be stored, this is needed so that paths can be
 *   made relative for require()
 */
export declare function generateConstantsForDataSamples(recordings: DisplayFormRecording[], targetDir: string): Array<OptionalKind<VariableStatementStructure>>;
//# sourceMappingURL=dataSample.d.ts.map