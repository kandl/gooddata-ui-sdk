/**
 * Because the ag-grid is not a true React component, a lot of the state related to operations
 * and interactions with ag-grid should be and are treated in 'typical' fashion, outside of the
 * usual React state.
 */
export class InternalTableState {
    constructor() {
        this.firstDataRendered = false;
        this.lastScrollPosition = {
            top: 0,
            left: 0,
        };
        this.isMetaOrCtrlKeyPressed = false;
        this.isAltKeyPressed = false;
        this.lastResizedWidth = 0;
        this.lastResizedHeight = 0;
        this.destroy = () => {
            var _a;
            this.abandonInitialization();
            this.stopWatching();
            (_a = this.table) === null || _a === void 0 ? void 0 : _a.destroy();
        };
        /**
         * Abandon current table initialization (if any). This will not cancel any in-flight requests but will
         * make sure that when they complete they are noop - dead work.
         */
        this.abandonInitialization = () => {
            if (this.initializer) {
                this.initializer.abandon();
            }
            this.initializer = undefined;
        };
        this.stopWatching = () => {
            if (this.watchingIntervalId) {
                clearInterval(this.watchingIntervalId);
                this.watchingIntervalId = undefined;
            }
        };
        this.startWatching = (handler, timeout) => {
            if (this.watchingIntervalId) {
                return;
            }
            this.watchingIntervalId = window.setInterval(handler, timeout);
        };
        /**
         * Checks if the last size on record for this table is same as the provided sizes. If it is, don't
         * do anything and return false. If the sizes differ, they will be updated and true is returned.
         *
         * @param width - width to test & update if needed
         * @param height - height to test & update if needed
         */
        this.checkAndUpdateLastSize = (width, height) => {
            if (this.lastResizedWidth !== width || this.lastResizedHeight !== height) {
                this.lastResizedWidth = width;
                this.lastResizedHeight = height;
                return true;
            }
            return false;
        };
    }
}
//# sourceMappingURL=tableState.js.map