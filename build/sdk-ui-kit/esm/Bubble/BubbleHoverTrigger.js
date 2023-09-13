// (C) 2007-2020 GoodData Corporation
import { BubbleTrigger } from "./BubbleTrigger.js";
export const SHOW_DELAY = 425;
export const HIDE_DELAY = 200;
/**
 * @internal
 */
class BubbleHoverTrigger extends BubbleTrigger {
    componentWillUnmount() {
        this.cancelBubbleVisibilityChange();
    }
    cancelBubbleVisibilityChange() {
        if (this.scheduleId) {
            window.clearTimeout(this.scheduleId);
        }
    }
    scheduleBubbleVisibilityChange(visible, delay = 0) {
        this.cancelBubbleVisibilityChange();
        this.scheduleId = window.setTimeout(() => {
            this.changeBubbleVisibility(visible);
            const { hoverHideDelay } = this.props;
            if (visible && hoverHideDelay) {
                this.scheduleBubbleVisibilityChange(false, hoverHideDelay);
            }
        }, delay);
    }
    eventListeners() {
        return {
            onMouseEnter: this.scheduleBubbleVisibilityChange.bind(this, true, this.props.showDelay),
            onMouseLeave: this.scheduleBubbleVisibilityChange.bind(this, false, this.props.hideDelay),
        };
    }
}
BubbleHoverTrigger.defaultProps = {
    showDelay: SHOW_DELAY,
    hideDelay: HIDE_DELAY,
    hoverHideDelay: 0,
    eventsOnBubble: false,
    tagName: "span",
};
export { BubbleHoverTrigger };
//# sourceMappingURL=BubbleHoverTrigger.js.map