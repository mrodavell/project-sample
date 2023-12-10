import React from "react";
import { AuthContext } from "@context";

const AuthProviders = ({ value, children }) => {

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProviders;