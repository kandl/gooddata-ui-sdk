export interface ITimezone {
    identifier: string;
    januaryOffset: number;
    juneOffset: number;
    title: string;
}
export declare const TIMEZONE_DEFAULT: ITimezone;
export declare function getUserTimezone(): ITimezone;
export declare function getTimezoneByIdentifier(title: string): ITimezone | undefined;
