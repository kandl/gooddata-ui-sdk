// (C) 2020 GoodData Corporation
import { NotSupported, UnexpectedError } from "@gooddata/sdk-backend-spi";
import bearFactory, { FixedLoginAndPasswordAuthProvider } from "@gooddata/sdk-backend-bear";
let backend = null;
export const getOrInitBackend = (username, password, hostname, backendType) => {
    // return the current backend if we have one
    if (backend) {
        return backend;
    }
    if (backendType === "tiger") {
        throw new NotSupported("Tiger backend does not support auth yet");
    }
    backend = bearFactory({ hostname }).withAuthentication(new FixedLoginAndPasswordAuthProvider(username, password));
    return backend;
};
const getBackend = () => {
    if (!backend) {
        throw new UnexpectedError("Backend not initialized before use. Make sure you have called initBackend.");
    }
    return backend;
};
export default getBackend;
