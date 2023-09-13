// (C) 2019-2023 GoodData Corporation
import axios from "axios";
export class TigerCancellationConverter {
    constructor(signal) {
        this.signal = signal;
    }
    forAxios() {
        const { signal } = this;
        if (!signal) {
            return {};
        }
        const source = axios.CancelToken.source();
        signal.addEventListener("abort", () => source.cancel());
        return {
            cancelToken: source.token,
        };
    }
}
//# sourceMappingURL=index.js.map