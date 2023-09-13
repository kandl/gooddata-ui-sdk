import { invariant } from "ts-invariant";
import range from "lodash/range.js";
import flatMap from "lodash/flatMap.js";
import isNil from "lodash/isNil.js";
/**
 * This implementation of {@link @gooddata/sdk-backend-spi#IPagedResource} pages over a list of items
 * provided at construction time. The paging is done using pre-configured page limit and starts at particular offset.
 *
 * @internal
 */
export class InMemoryPaging {
    constructor(allItems, limit = 50, offset = 0) {
        this.allItems = allItems;
        invariant(offset >= 0, `paging offset must be non-negative, got: ${offset}`);
        invariant(limit > 0, `limit must be a positive number, got: ${limit}`);
        // this will naturally return empty items if at the end of data; limit will always be positive
        this.items = allItems.slice(offset, offset + limit);
        // offset is at most at the end of all available elements
        this.offset = Math.min(offset, allItems.length);
        // limit is always kept as-requested
        this.limit = limit;
        this.totalCount = allItems.length;
    }
    async next() {
        if (this.items.length === 0) {
            return this;
        }
        return new InMemoryPaging(this.allItems, this.limit, this.offset + this.items.length);
    }
    async goTo(pageIndex) {
        if (this.items.length === 0) {
            return this;
        }
        return new InMemoryPaging(this.allItems, this.limit, pageIndex * this.items.length);
    }
    async all() {
        return [...this.allItems];
    }
    async allSorted(compareFn) {
        return [...this.allItems].sort(compareFn);
    }
}
/**
 * Common implementation of the {@link @gooddata/sdk-backend-spi#IPagedResource} for the server-side paging.
 *
 * @internal
 */
export class ServerPaging {
    static async for(getData, limit = 50, offset = 0) {
        invariant(offset >= 0, `paging offset must be non-negative, got: ${offset}`);
        invariant(limit > 0, `limit must be a positive number, got: ${limit}`);
        const { totalCount, items } = await getData({ limit, offset });
        // must use isNil, totalCount: 0 is a valid case (e.g. when searching for a nonsensical string)
        invariant(!isNil(totalCount), `total count must be specified, got: ${totalCount}`);
        return new ServerPaging(getData, limit, offset, totalCount, items);
    }
    constructor(getData, limit = 50, offset = 0, totalCount, items) {
        this.getData = getData;
        this.limit = limit;
        this.offset = offset;
        this.totalCount = totalCount;
        this.items = items;
        this.next = async () => {
            // No items = we are on the last page.
            if (this.items.length === 0) {
                return this;
            }
            // We are on the last page with the items - return empty result for the next page immediately
            if (this.items.length < this.limit || this.offset + this.items.length === this.totalCount) {
                return new ServerPaging(this.getData, this.limit, this.offset + this.limit, this.totalCount, []);
            }
            const pageData = await this.getData({ limit: this.limit, offset: this.offset + this.limit });
            return new ServerPaging(this.getData, this.limit, this.offset + this.limit, pageData.totalCount, pageData.items);
        };
        this.goTo = async (pageIndex) => {
            const offset = pageIndex * this.limit;
            const pageData = await this.getData({ limit: this.limit, offset });
            return new ServerPaging(this.getData, this.limit, offset, pageData.totalCount, pageData.items);
        };
        this.all = async () => {
            const results = [];
            const maxRequests = 6;
            const allPagesToLoad = range(0, this.totalCount / this.limit);
            // if the paged resource is already at the 0 offset, use it directly to save a duplicate request
            if (this.offset === 0) {
                results.push(...this.items);
                allPagesToLoad.shift();
            }
            while (allPagesToLoad.length > 0) {
                const pagesToLoad = allPagesToLoad.slice(0, maxRequests);
                allPagesToLoad.splice(0, maxRequests);
                const loadedPages = await Promise.all(pagesToLoad.map((page) => this.goTo(page)));
                results.push(...flatMap(loadedPages, (page) => page.items));
            }
            return results;
        };
        this.allSorted = async (compareFn) => {
            const all = await this.all();
            return all.sort(compareFn);
        };
    }
}
//# sourceMappingURL=paging.js.map