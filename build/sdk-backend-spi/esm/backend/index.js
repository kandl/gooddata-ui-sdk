// (C) 2019-2023 GoodData Corporation
//
// Supporting / convenience functions
//
/**
 * Prepares execution of the provided definition against a backend.
 *
 * @remarks
 * This is a convenience function which uses the backend methods to create and prepare an execution.
 *
 * @param definition - execution definition to prepare execution for
 * @param backend - backend to use
 * @returns new prepared execution
 * @public
 */
export function prepareExecution(backend, definition) {
    return backend.workspace(definition.workspace).execution().forDefinition(definition);
}
//# sourceMappingURL=index.js.map