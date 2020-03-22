import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div id="notfound" className="error" style={{ position: "relative" }}>
      <div className="notfound">
        <div className="notfound-404">
          <h1>
            4
            <img
              id="404Image"
              src={"/emoji.png"}
              height="200px"
              width="200px"
            />
            4
          </h1>
        </div>
        <h2>Oops! Page Not Be Found</h2>
        <p>
          Sorry but the page you are looking for does not exist, have been
          removed. name changed or is temporarily unavailable
        </p>
        <Link
          id="backToHomePageLink"
          to="/"
          className="btn btn-primary btn-lg"
          style={{ position: "relative" }}
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
