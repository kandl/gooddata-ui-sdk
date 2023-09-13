const max = (a, b) => (a > b ? a : b);
const min = (a, b) => (a <= b ? a : b);
export const sanitizeDateFilterOption = (option) => (Object.assign(Object.assign({}, option), { from: min(option.from, option.to), to: max(option.from, option.to) }));
//# sourceMappingURL=sanitization.js.map