import { getApi } from "../api/ApiUtils";
import React, { useState, useEffect } from "react";
import Select from "react-select";

const Columns = props => {
  const [columnOptions, setColumnOptions] = useState([]);
  const [option, setOption] = useState("id");

  const setColumns = data => {
    setColumnOptions(
      Object.keys(data).map(function(txt) {
        return { label: data[txt], value: data[txt] };
      })
    );
  };

  useEffect(() => {
    getApi(`result/${props.entity}/columns`, setColumns);
  }, [props.entity, setOption, setColumnOptions]);

  return (
    <>
      <Select
        isMulti
        options={columnOptions}
        onChange={option => {
          let resultOpt = Object.keys(option).map(i => option[i]);
          resultOpt = resultOpt.map(function(obj) {
            return obj["value"];
          });
          let resultCols = resultOpt.join(",");

          setOption(resultCols.toLowerCase());
          if (props.parentCallback) props.parentCallback(resultCols);
        }}
      />
    </>
  );
};

export default Columns;
