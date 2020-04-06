import SelectTable from "./SelectTable";
import ProjectTable from "./ProjectTable";
import InsertTable from "./InsertTable";
import DeleteTable from "./DeleteTable";
import AggTable from "./AggTable";
import JoinTable from "./JoinTable";
import DivisionTable from "./DivisionTable";

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
      Table:
      <Select
        options={modifiedEntities}
        onChange={option => setEntity(option.value.toLowerCase())}
      />
      {entity !== "" ? (
        <>
          Query Type:
          <Select
            options={modifiedQT}
            onChange={option => setQueryType(option.value)}
          />
        </>
      ) : (
        <></>
      )}
      {queryType === 1 ? <InsertTable entity={entity} /> : <></>}
      {queryType === 2 ? <DeleteTable entity={entity} /> : <></>}
      {queryType === 4 ? <SelectTable entity={entity} /> : <></>}
      {queryType === 5 ? <ProjectTable entity={entity} /> : <></>}
      {queryType === 6 ? <JoinTable entity={entity} /> : <></>}
      {queryType === 7 ? <AggTable entity={entity} /> : <></>}
      {queryType === 9 ? <DivisionTable entity={entity} /> : <></>}
    </div>
  );
};

export default MainPage;
