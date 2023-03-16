import React from "react";
import PropTypes from "prop-types";

/**
 * NewStrong is a reusable component that adds a new style to the strong tag
 * @returns returns the strong tag with the new style
 */
const NewStrong = ({ children }) => {
    return (
        <strong  style={{ color:"black", fontSize: "1.2em", fontWeight: "bold"}}>
            {children}
        </strong>
    );
};

NewStrong.propTypes = {
    children: PropTypes.node.isRequired
};

export default NewStrong;