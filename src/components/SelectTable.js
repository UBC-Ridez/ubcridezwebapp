import { getApi } from "../api/ApiUtils";
import React, { useState, useEffect } from "react";
import ReactTable from "react-table";

const SelectTable = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getApi(props.entity, setData);
  }, [props.entity]);

  const columns = Object.keys(data).map((key, id) => {
    return {
      Header: key,
      accessor: key
    };
  });

  return props.entity ? <ReactTable data={data} columns={columns} /> : <></>;
};

export default SelectTable;
