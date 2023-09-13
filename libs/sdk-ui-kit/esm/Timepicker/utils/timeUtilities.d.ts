export declare const HOURS_IN_DAY = 24;
export declare const TIME_ANCHOR = 30;
/**
 * @internal
 */
export declare function formatTime(h: number, m: number, format?: string): string;
export declare function updateTime(h: number, m: number): Date;
/**
 * @internal
 * export normalizeTime function for use outside this component
 * return 7:30 if time is 7:25
 * return 8:00 if time is 7:35
 * return 0:00 if time is 23:45
 */
export declare function normalizeTime(time: Date): Date;
//# sourceMappingURL=timeUtilities.d.ts.map