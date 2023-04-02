import React from "react";
import PropTypes from "prop-types";

/**
 * StrongText is a reusable component that adds a new style to the strong tag
 * @returns returns the strong tag with the new style
 */
const StrongText = ({ children }: { children: React.ReactNode }) => {
    return (
        <strong  style={{ color:"black", fontSize: "1.2em", fontWeight: "bold"}}>
            {children}
        </strong>
    );
};

export default StrongText;