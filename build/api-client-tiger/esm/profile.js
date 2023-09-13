export const tigerProfileClientFactory = (axios) => {
    return {
        // TODO: replace with direct call of TigerClient (once methods are generated from OpenAPI)
        getCurrent: async () => (await axios.get("/api/v1/profile")).data,
    };
};
//# sourceMappingURL=profile.js.map