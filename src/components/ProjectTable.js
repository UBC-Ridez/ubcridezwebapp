import { getApi } from "../api/ApiUtils";
import React, { useState, useEffect } from "react";
import ViewResults from "./ViewResults";
import Columns from "./Columns";

const ProjectTable = props => {
  const [data, setData] = useState([]);
  const [column, setColumn] = useState("id");

  useEffect(() => {
    if (props.entity.length !== 0)
      getApi(
        `result/${props.entity}/getProjectedResults${
          column === "" ? "" : `?columns=${column}`
        }`,
        setData
      );
  }, [props.entity, column]);

  return (
    <>
      Projected Columns:
      <Columns
        entity={props.entity}
        parentCallback={setColumn}
        isMulti={true}
      />
      Results:
      <ViewResults data={data} />
    </>
  );
};

export default ProjectTable;
