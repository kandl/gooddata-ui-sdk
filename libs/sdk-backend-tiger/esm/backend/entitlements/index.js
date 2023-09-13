// (C) 2021-2023 GoodData Corporation
export class TigerEntitlements {
    constructor(authCall) {
        this.authCall = authCall;
    }
    async resolveEntitlements() {
        const entitlements = await this.authCall((client) => client.actions.resolveAllEntitlements());
        return entitlements.data;
    }
}
//# sourceMappingURL=index.js.map