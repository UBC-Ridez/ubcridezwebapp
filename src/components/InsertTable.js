import { getApi, postApi } from "../api/ApiUtils";
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

const InsertTable = props => {
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [failureOpen, setFailureOpen] = React.useState(false);

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getApi(`result/${props.entity}/columns`, setColumns);
  }, [props.entity]);

  const submitForm = () => {
    let payload = {};
    columns.map(x => {
      if (x !== "id")
        payload[x] = document.getElementById(`textfield-${x}`).value;
    });
    postApi(props.entity, payload, successSnackBar, failureSnackBar);
  };

  const successSnackBar = () => {
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
      <List component="nav" className={classes.root} aria-label="columns">
        {columns.map(x =>
          x !== "id" ? (
            <>
              <ListItem button>
                <ListItemText primary={x} />
                <TextField id={`textfield-${x}`} label={x} variant="outlined" />
              </ListItem>
              <Divider />
            </>
          ) : (
            <></>
          )
        )}
      </List>
      <Button variant="contained" onClick={submitForm}>
        SUBMIT
      </Button>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success">
          New entry has been created.
        </Alert>
      </Snackbar>
      <Snackbar
        open={failureOpen}
        autoHideDuration={6000}
        onClose={handleFailureClose}
      >
        <Alert onClose={handleFailureClose} severity="error">
          Couldn't save the new enty.
        </Alert>
      </Snackbar>
    </>
  );
};

export default InsertTable;
