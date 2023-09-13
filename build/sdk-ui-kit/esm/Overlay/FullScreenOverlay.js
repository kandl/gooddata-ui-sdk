// (C) 2007-2022 GoodData Corporation
import merge from "lodash/merge.js";
import { Overlay } from "./Overlay.js";
/**
 * @internal
 */
export class FullScreenOverlay extends Overlay {
    constructor(props) {
        super(props);
        this.getOverlayStyles = () => {
            const zIndex = this.getZIndex();
            const additionalStyles = zIndex ? { zIndex } : {};
            return Object.assign({ position: "fixed", left: 0, top: 0, bottom: 0, right: 0 }, additionalStyles);
        };
        this.state = merge(this.state, {
            position: {},
            overflow: "auto",
            scrollTop: 0,
        });
    }
    UNSAFE_componentWillMount() {
        const { body } = document;
        const { overflow } = getComputedStyle(body);
        const { scrollTop } = body;
        this.setState({
            overflow,
            scrollTop,
        });
        body.style.overflow = "hidden";
        body.scrollTop = 0;
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        const { body } = document;
        body.style.overflow = this.state.overflow;
        body.scrollTop = this.state.scrollTop;
    }
}
//# sourceMappingURL=FullScreenOverlay.js.map