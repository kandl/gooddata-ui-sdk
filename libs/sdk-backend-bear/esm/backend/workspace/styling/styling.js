import { isTheme, unwrapMetadataObject } from "@gooddata/api-model-bear";
import { isApiResponseError } from "../../../utils/errorHandling.js";
export class BearWorkspaceStyling {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.getColorPalette = async () => {
            const palette = await this.authCall((sdk) => sdk.project.getColorPaletteWithGuids(this.workspace));
            return palette || [];
        };
        this.getTheme = async () => {
            const config = await this.authCall((sdk) => sdk.project.getProjectFeatureFlags(this.workspace));
            const identifier = config.selectedUiTheme;
            return identifier
                ? this.authCall((sdk) => sdk.md
                    .getObjectByIdentifier(this.workspace, identifier)
                    .then((object) => {
                    const unwrappedObject = unwrapMetadataObject(object);
                    return (isTheme(unwrappedObject) && unwrappedObject.content) || {};
                })
                    .catch((err) => {
                    if (isApiResponseError(err)) {
                        return {};
                    }
                    throw err;
                }))
                : {};
        };
    }
}
//# sourceMappingURL=styling.js.map