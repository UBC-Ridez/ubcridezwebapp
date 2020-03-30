import { getApi, deleteApi } from "../api/ApiUtils";
import ViewResults from "./ViewResults";
import Columns from "./Columns";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const DeleteTable = props => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [option, setOption] = useState({ label: 0, value: 0 });
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [failureOpen, setFailureOpen] = React.useState(false);

  useEffect(() => {
    if (props.entity.length !== 0)
      getApi(`result/${props.entity}/getProjectedResults`, modifyData);
  }, [props.entity, successOpen, failureOpen]);

  const modifyData = items => {
    let itemsOpt = Object.keys(items).map(i => items[i]);
    setData(
      itemsOpt.map(x => {
        return { label: x["id"], value: x["id"] };
      })
    );
  };

  const deleteItem = () => {
    deleteApi(
      `${props.entity}/${option["value"]}`,
      successSnackBar,
      failureSnackBar
    );
  };

  const successSnackBar = () => {
    getApi(`result/${props.entity}/getProjectedResults`, modifyData);
    setOption({ label: 0, value: 0 });
    setSuccessOpen(true);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  const failureSnackBar = () => {
    setFailureOpen(true);
  };

  const handleFailureClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFailureOpen(false);
  };

  return (
    <>
      <Select
        key={option["value"]}
        options={data}
        onChange={option => {
          setOption(option);
        }}
      />
      <Button variant="contained" onClick={deleteItem}>
        DELETE
      </Button>

      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success">
          Entry has been deleted.
        </Alert>
      </Snackbar>
      <Snackbar
        open={failureOpen}
        autoHideDuration={6000}
        onClose={handleFailureClose}
      >
        <Alert onClose={handleFailureClose} severity="error">
          Couldn't delete the enty.
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteTable;
