import { getApi } from "../api/ApiUtils";
import React, { useState, useEffect } from "react";
import ViewResults from "./ViewResults";
import Columns from "./Columns";
import { AGG_FUNCS } from "../GlobalConstants";
import Select from "react-select";
import { ENTITIES } from "../GlobalConstants";

const DivisionTable = props => {
  const [data, setData] = useState([]);
  const [table2, setTable2] = useState("");
  const [table3, setTable3] = useState("");
  const [projectColumns, setProjectColumns] = useState("id");
  const [firstTableColumn, setFirstTableColumn] = useState("id");
  const [secondTableColumn, setSecondTableColumn] = useState("id");
  const [thirdTableColumn1, setThirdTableColumn1] = useState("id");
  const [thirdTableColumn2, setThirdTableColumn2] = useState("id");

  const modifiedEntities = Object.keys(ENTITIES).map(function(txt) {
    return { label: txt, value: txt };
  });

  useEffect(() => {
    if (props.entity.length !== 0 && table2.length !== 0 && table3.length !== 0)
      getApi(
        `result/${props.entity}/getDivisionResults/${table2}/${table3}?projectedColumns=${projectColumns}&firstTableColumn=${firstTableColumn}&secondTableColumn=${secondTableColumn}&thirdTableColumn1=${thirdTableColumn1}&thirdTableColumn2=${thirdTableColumn2}`,
        setData
      );
  }, [
    props.entity,
    table2,
    table3,
    projectColumns,
    firstTableColumn,
    secondTableColumn,
    thirdTableColumn1,
    thirdTableColumn2
  ]);

  return (
    <>
      First Table Column:
      <Columns
        entity={props.entity}
        parentCallback={setFirstTableColumn}
        isMulti={false}
      />
      Projected Columns:
      <Columns
        entity={props.entity}
        parentCallback={setProjectColumns}
        isMulti={true}
      />
      Second Table:
      <Select
        options={modifiedEntities}
        onChange={option => setTable2(option.value.toLowerCase())}
      />
      {table2 ? (
        <>
          Second Table Column:
          <Columns
            entity={table2}
            parentCallback={setSecondTableColumn}
            isMulti={false}
          />
        </>
      ) : (
        <></>
      )}
      Third Table:
      <Select
        options={modifiedEntities}
        onChange={option => setTable3(option.value.toLowerCase())}
      />
      {table3 ? (
        <>
          Third Table Column1:
          <Columns
            entity={table3}
            parentCallback={setThirdTableColumn1}
            isMulti={false}
          />
          Third Table Column2:
          <Columns
            entity={table3}
            parentCallback={setThirdTableColumn2}
            isMulti={false}
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

export default DivisionTable;
