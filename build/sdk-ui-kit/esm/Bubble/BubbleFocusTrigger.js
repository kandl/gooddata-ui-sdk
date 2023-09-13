// (C) 2020 GoodData Corporation
import { BubbleTrigger } from "./BubbleTrigger.js";
/**
 * @internal
 */
class BubbleFocusTrigger extends BubbleTrigger {
    eventListeners() {
        return {
            onFocus: this.changeBubbleVisibility.bind(this, true),
            onBlur: this.changeBubbleVisibility.bind(this, false),
        };
    }
}
BubbleFocusTrigger.defaultProps = {
    tagName: "span",
    eventsOnBubble: true,
};
export { BubbleFocusTrigger };
//# sourceMappingURL=BubbleFocusTrigger.js.map