import { getApi } from "../api/ApiUtils";
import ViewResults from "./ViewResults";
import Columns from "./Columns";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const SelectTable = props => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [column, setColumn] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  const [cond, setCond] = useState("");

  useEffect(() => {
    if (props.entity.length !== 0)
      getApi(
        `result/${props.entity}/getConditionedResults${
          cond === "" ? "" : `?cond=${cond}`
        }`,
        setData
      );
  }, [props.entity, refreshData]);

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Condition"
        variant="outlined"
        onChange={e => {
          setCond(e.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          setRefreshData(!refreshData);
        }}
      >
        {" "}
        REFRESH
      </Button>

      <ViewResults data={data} />
    </>
  );
};

export default SelectTable;
