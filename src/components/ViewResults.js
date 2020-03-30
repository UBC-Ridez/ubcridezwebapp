import React from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

const ViewResults = props => {
  const columns =
    props.data.length > 0
      ? Object.keys(props.data["0"]).map((key, id) => {
          return {
            Header: key
              .replace(/([A-Z])/g, " $1")
              // uppercase the first character
              .replace(/^./, function(str) {
                return str.toUpperCase();
              }),
            accessor:
              typeof props.data["0"][key] == "object" ? key + ".id" : key
          };
        })
      : [];

  return columns.length !== 0 ? (
    <ReactTable data={props.data} columns={columns} />
  ) : (
    <></>
  );
};

export default ViewResults;
