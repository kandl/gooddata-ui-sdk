/**
 * @internal
 */
export function sanitizeHeader(header) {
    // get rid of empty values in header altogether
    return (header && Object.assign(Object.assign({}, (header.description && { description: header.description })), (header.title && { title: header.title })));
}
//# sourceMappingURL=utils.js.map