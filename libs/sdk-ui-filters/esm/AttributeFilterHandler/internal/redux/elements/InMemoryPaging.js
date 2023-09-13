import { invariant } from "ts-invariant";
// inspired by the same thing in sdk-backend-base, copied here to avoid the dependency
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
//# sourceMappingURL=InMemoryPaging.js.map