import SelectTable from "./SelectTable";
import ProjectTable from "./ProjectTable";
import InsertTable from "./InsertTable";
import DeleteTable from "./DeleteTable";
import Select from "react-select";
import { QUERY_TYPES, ENTITIES } from "../GlobalConstants";
import React, { useState } from "react";

const MainPage = () => {
  const [entity, setEntity] = useState("");
  const [queryType, setQueryType] = useState(0);

  const modifiedEntities = Object.keys(ENTITIES).map(function(txt) {
    return { label: txt, value: txt };
  });
  const modifiedQT = Object.keys(QUERY_TYPES).map(function(txt) {
    return { label: txt, value: QUERY_TYPES[txt] };
  });

  return (
    <div className="App">
      <h1>UBC Ridez App</h1>
      <Select
        options={modifiedEntities}
        onChange={option => setEntity(option.value.toLowerCase())}
      />
      {entity !== "" ? (
        <Select
          options={modifiedQT}
          onChange={option => setQueryType(option.value)}
        />
      ) : (
        <></>
      )}
      {queryType === 1 ? <InsertTable entity={entity} /> : <></>}
      {queryType === 2 ? <DeleteTable entity={entity} /> : <></>}

      {queryType === 4 ? <SelectTable entity={entity} /> : <></>}
      {queryType === 5 ? <ProjectTable entity={entity} /> : <></>}
    </div>
  );
};

export default MainPage;
