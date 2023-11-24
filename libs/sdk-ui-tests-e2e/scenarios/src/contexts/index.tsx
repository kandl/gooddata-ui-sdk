// (C) 2022 GoodData Corporation
import React from "react";

import { AuthProvider } from "./Auth/index.js";

export const AppProviders: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return <AuthProvider>{children}</AuthProvider>;
};
