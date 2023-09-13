/**
 * Transforms the result headers in an AFM execution result.
 *
 * @param resultHeaders - Execution result headers to be transformed.
 * @param resultHeaderTransformer - The transformation function to be called to transform each result header.
 * @param postProcessing - Contains any configuration that should be used during transformation.
 * @returns The transformed result headers if resultHeaderTransformer has a value,
 *  or resultHeaders is returned if resultHeaderTransformer does not have any value.
 *
 * @public
 */
export function transformResultHeaders(resultHeaders, resultHeaderTransformer, postProcessing) {
    if (!resultHeaderTransformer) {
        return resultHeaders;
    }
    return resultHeaders.map((resultHeaders1) => {
        return resultHeaders1.map((resultHeaders2) => {
            return resultHeaders2.map((resultHeader) => {
                return resultHeaderTransformer(resultHeader, postProcessing);
            });
        });
    });
}
//# sourceMappingURL=result.js.map