import { AxiosRequestConfig } from "axios";
export declare class TigerCancellationConverter {
    private readonly signal;
    constructor(signal: AbortSignal | null);
    forAxios(): Pick<AxiosRequestConfig, "cancelToken">;
}
//# sourceMappingURL=index.d.ts.map