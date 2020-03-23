import { getApi } from "../api/ApiUtils";
import React, { useState, useEffect } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

const SelectTable = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.entity.length !== 0) getApi(props.entity, setData);
  }, [props.entity]);

  const columns =
    data.length > 0
      ? Object.keys(data["0"]).map((key, id) => {
          return {
            Header: key
              .replace(/([A-Z])/g, " $1")
              // uppercase the first character
              .replace(/^./, function(str) {
                return str.toUpperCase();
              }),
            accessor: typeof data["0"][key] == "object" ? key + ".id" : key
          };
        })
      : [];

  return columns.length !== 0 ? (
    <ReactTable data={data} columns={columns} />
  ) : (
    <></>
  );
};

export default SelectTable;
