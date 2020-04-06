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
import Select from "react-select";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const InsertTable = props => {
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [failureOpen, setFailureOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [option, setOption] = useState({ label: 0, value: 0 });
  const [data2, setData2] = useState({});

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getApi(`result/${props.entity}/columns`, setColumns);
    getApi(`result/${props.entity}/getProjectedResults`, modifyData);
    setOption({ label: 0, value: 0 });
  }, [props.entity]);

  const getData2 = () => {
    getApi(
      `result/${props.entity}/getConditionedResults?cond=id=${option["value"]}`,
      modifyData2
    );
  };

  const modifyData2 = items => {
    Object.keys(items).map(i => {
      setData2(items[i]);
    });
  };

  const modifyData = items => {
    let itemsOpt = Object.keys(items).map(i => items[i]);
    setData(
      itemsOpt.map(x => {
        return { label: x["id"], value: x["id"] };
      })
    );
  };

  const submitForm = () => {
    let payload = {};
    columns.map(x => {
      let camelized = camelize(x);
      payload[camelized] = document.getElementById(`textfield-${x}`).value;
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

  const camelize = str => {
    return (
      str[0].toLowerCase() +
      str
        .replace(/_([a-z])/g, function(a, b) {
          return b.toUpperCase();
        })
        .slice(1)
    );
  };
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Ids</InputLabel>
        <Select
          key={option["value"]}
          options={data}
          onChange={option => {
            setOption(option);
            getData2();
          }}
        />
      </FormControl>

      <List component="nav" className={classes.root} aria-label="columns">
        {columns.map(x =>
          x !== "id" ? (
            <>
              <ListItem button>
                <ListItemText primary={x} />
                <TextField
                  key={data2 ? data2[x] : x}
                  id={`textfield-${x}`}
                  label={x}
                  variant="outlined"
                  defaultValue={data2 ? data2[x] : x}
                />
              </ListItem>
              <Divider />
            </>
          ) : (
            <>
              <ListItem button>
                <ListItemText primary={x} />
                <TextField
                  key={data2 ? data2[x] : x}
                  disabled
                  id={`textfield-${x}`}
                  label={x}
                  variant="outlined"
                  defaultValue={data2 ? data2[x] : x}
                />
              </ListItem>
              <Divider />
            </>
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
          Entry has been updated.
        </Alert>
      </Snackbar>
      <Snackbar
        open={failureOpen}
        autoHideDuration={6000}
        onClose={handleFailureClose}
      >
        <Alert onClose={handleFailureClose} severity="error">
          Couldn't update the new enty.
        </Alert>
      </Snackbar>
    </>
  );
};

export default InsertTable;
