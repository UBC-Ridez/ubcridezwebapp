import { getApi } from "../api/ApiUtils";
import React, { useState, useEffect } from "react";
import ViewResults from "./ViewResults";
import Columns from "./Columns";
import { AGG_FUNCS } from "../GlobalConstants";
import Select from "react-select";
import { ENTITIES } from "../GlobalConstants";

const JoinTable = props => {
  const [data, setData] = useState([]);
  const [table2, setTable2] = useState("");
  const [projectColumns, setProjectColumns] = useState("id");
  const [projectColumns2, setProjectColumns2] = useState("id");
  const [joinColumn, setJoinColumn] = useState("id");
  const [joinColumn2, setJoinColumn2] = useState("id");

  const modifiedEntities = Object.keys(ENTITIES).map(function(txt) {
    return { label: txt, value: txt };
  });

  useEffect(() => {
    if (props.entity.length !== 0 && table2.length !== 0)
      getApi(
        `result/${props.entity}/getJoinResults/${table2}?joinColumn=${joinColumn}&joinColumn2=${joinColumn2}&projectedColumns=${projectColumns}&projectedColumns2=${projectColumns2}`,
        setData
      );
  }, [
    props.entity,
    table2,
    joinColumn,
    joinColumn2,
    projectColumns,
    projectColumns2
  ]);

  return (
    <>
      Join Column:
      <Columns
        entity={props.entity}
        parentCallback={setJoinColumn}
        isMulti={false}
      />
      Projected Columns:
      <Columns
        entity={props.entity}
        parentCallback={setProjectColumns}
        isMulti={true}
      />
      Join Table:
      <Select
        options={modifiedEntities}
        onChange={option => setTable2(option.value.toLowerCase())}
      />
      {table2 ? (
        <>
          {" "}
          Join Column (Table2):
          <Columns
            entity={table2}
            parentCallback={setJoinColumn2}
            isMulti={false}
          />
          Projected Columns (Table2):
          <Columns
            entity={table2}
            parentCallback={setProjectColumns2}
            isMulti={true}
          />
        </>
      ) : (
        <></>
      )}
      Results:
      <ViewResults data={data} />
    </>
  );
};

export default JoinTable;
