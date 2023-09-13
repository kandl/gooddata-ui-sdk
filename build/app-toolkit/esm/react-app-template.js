import { fileURLToPath } from "url";
import * as path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/*
 * This file is intentionally named and located in the root to reflect the location of the archives
 * that contain the template project.
 */
export function getReactAppTemplateArchive(language) {
    return path.join(__dirname, `react-app-template.${language}.tgz`);
}
//# sourceMappingURL=react-app-template.js.map