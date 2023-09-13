import { OptionalKind, VariableStatementStructure } from "ts-morph";
import { CatalogRecording } from "../recordings/catalog.js";
/**
 * Generate constants for catalog recording. This function will return non-exported constant per recording.
 *
 * @param recording - recording to generate constants for
 * @param targetDir - absolute path to directory where index will be stored, this is needed so that paths can be
 *   made relative for require()
 */
export declare function generateConstantsForCatalog(recording: CatalogRecording | null, targetDir: string): Array<OptionalKind<VariableStatementStructure>>;
//# sourceMappingURL=catalog.d.ts.map