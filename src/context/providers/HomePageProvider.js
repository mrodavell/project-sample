import React from "react";
import { HomePageContext } from "@context";

const HomePageProviders = ({ value, children }) => {

    return (
        <HomePageContext.Provider value={value}>
            {children}
        </HomePageContext.Provider>
    )
}

export default HomePageProviders;