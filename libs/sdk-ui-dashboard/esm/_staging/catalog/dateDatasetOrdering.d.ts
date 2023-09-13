import { ICatalogDateDataset } from "@gooddata/sdk-model";
export declare function sortByRelevanceAndTitle(dateDatasets: ICatalogDateDataset[], titleMapping: Record<string, string>): ICatalogDateDataset[];
export declare function sanitizeDateDatasetTitle(dataset: ICatalogDateDataset): string;
