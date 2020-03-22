import SelectTable from "./components/SelectTable";
import "./App.css";
import Select from "react-dropdown-select";
import { ENTITIES } from "./GlobalConstants";
import React, { useState } from "react";

const App = () => {
  const [entity, setEntity] = useState("");
  const modifiedEntities = Object.keys(ENTITIES).map(function(txt) {
    return { label: txt, value: txt };
  });

  return (
    <div className="App">
      <h1>UBC Ridez App</h1>
      <Select
        options={modifiedEntities}
        onChange={values => setEntity(values)}
      />
      <SelectTable entity={entity} />
    </div>
  );
};

export default App;
