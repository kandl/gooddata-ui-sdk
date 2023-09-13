import AbstractProvider from "./AbstractProvider.js";
import LegacyHeadlineTransformation from "../transformations/LegacyHeadlineTransformation.js";
class LegacyProvider extends AbstractProvider {
    getHeadlineTransformationComponent() {
        return LegacyHeadlineTransformation;
    }
}
export default LegacyProvider;
//# sourceMappingURL=LegacyProvider.js.map