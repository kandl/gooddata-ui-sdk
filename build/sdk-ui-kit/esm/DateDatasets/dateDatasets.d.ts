import { IDateDataset, IDateDatasetHeader } from "./typings.js";
/**
 * @internal
 */
export declare const isDateDatasetHeader: (obj: unknown) => obj is IDateDatasetHeader;
/**
 * @internal
 */
export declare const recommendedHeader: IDateDatasetHeader;
/**
 * @internal
 */
export declare const otherHeader: IDateDatasetHeader;
/**
 * @internal
 */
export declare const relatedHeader: IDateDatasetHeader;
/**
 * @internal
 */
export declare const unrelatedHeader: IDateDatasetHeader;
/**
 * @internal
 */
export declare function getRecommendedDateDataset<T extends IDateDataset>(items: T[]): T;
/**
 * @internal
 */
export declare function transform2Dropdown<T extends IDateDataset>(dateDatasets: T[]): Array<T | IDateDatasetHeader>;
/**
 * @internal
 */
export declare function preselectDateDataset<T extends IDateDataset>(dateDatasets: T[], recommendedDate: T): Array<T | IDateDatasetHeader>;
/**
 * @internal
 */
export declare function sortDateDatasets<T extends IDateDataset>(dateDatasets: T[], recommendedDate?: T, unrelatedDate?: T): Array<T | IDateDatasetHeader>;
//# sourceMappingURL=dateDatasets.d.ts.map