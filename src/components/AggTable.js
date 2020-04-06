import { getApi } from "../api/ApiUtils";
import React, { useState, useEffect } from "react";
import ViewResults from "./ViewResults";
import Columns from "./Columns";
import { AGG_FUNCS } from "../GlobalConstants";
import Select from "react-select";

const AggTable = props => {
  const [data, setData] = useState([]);
  const [column, setColumn] = useState("");
  const [aggFunc, setAggFunc] = useState("count");
  const [aggColumn, setAggColumn] = useState("*");
  const funcs_agg = Object.keys(AGG_FUNCS).map(function(txt) {
    return { label: txt, value: txt };
  });

  useEffect(() => {
    if (props.entity.length !== 0)
      getApi(
        `result/${props.entity}/getAggResults?aggFunc=${aggFunc}${
          aggColumn === "" ? "" : `&aggColumn=${aggColumn}`
        }${column === "" ? "" : `&columns=${column}`}`,
        setData
      );
  }, [props.entity, column, aggFunc, aggColumn]);

  return (
    <>
      Aggergate Func:
      <Select
        options={funcs_agg}
        onChange={option => {
          setAggFunc(option["value"]);
        }}
      />
      Aggergate Columns (Please only select a valid column for the particular
      selected function):
      <Columns
        entity={props.entity}
        parentCallback={setAggColumn}
        isMulti={false}
      />
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

export default AggTable;
