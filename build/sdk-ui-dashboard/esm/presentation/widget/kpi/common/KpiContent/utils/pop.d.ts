type Trend = "neutral" | "up" | "down";
type Meaning = "neutral" | "positive" | "negative";
export interface IPopInfo {
    trend: Trend;
    meaning: Meaning;
    percentage: string;
}
export declare const LIMIT = 999;
export declare function getPopInfo(previous: number | null, current: number | null, meaning: string | undefined): IPopInfo;
export declare function getErrorPopInfo(): IPopInfo;
export {};
