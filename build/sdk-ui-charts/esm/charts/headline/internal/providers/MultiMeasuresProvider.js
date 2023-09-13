import AbstractProvider from "./AbstractProvider.js";
import MultiMeasuresTransformation from "../transformations/MultiMeasuresTransformation.js";
class MultiMeasuresProvider extends AbstractProvider {
    getHeadlineTransformationComponent() {
        return MultiMeasuresTransformation;
    }
}
export default MultiMeasuresProvider;
//# sourceMappingURL=MultiMeasuresProvider.js.map