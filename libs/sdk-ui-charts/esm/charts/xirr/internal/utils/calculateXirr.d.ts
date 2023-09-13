export interface IXirrInput {
    amount: number;
    when: Date;
}
/**
 * Calculates the XIRR value for the (amount, when) pairs.
 * @see https://en.wikipedia.org/wiki/Internal_rate_of_return#Exact_dates_of_cash_flows for mathematical background.
 */
export declare const calculateXirr: (transactions: IXirrInput[], guess?: number) => number;
//# sourceMappingURL=calculateXirr.d.ts.map