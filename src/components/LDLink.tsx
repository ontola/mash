import { lowLevel } from "link-redux";
import * as React from "react";
import { Link } from "react-router-dom";
import { dbpediaToWikiPath } from "../helpers/iris";

const LDLink = ({ className, children, subject, to }) => (
    <Link
        className={className}
        to={dbpediaToWikiPath(to || subject)}
    >
        {children}
    </Link>
);

export default lowLevel.linkedSubject(LDLink);
