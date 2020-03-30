export const PROTOCOL = "https://";
export const HOST = "ubcridez.herokuapp.com/";
export const SERVER_URL = PROTOCOL + HOST;
export const API_URL = SERVER_URL + "/api";

export const ENTITIES = {
  FEEDBACK: "feedback",
  RIDE: "ride",
  RIDER: "rider",
  RIDEE: "ridee",
  PREFERENCE: "preference",
  MEMBER: "member",
  ADDRESS: "address",
  INSURANCE: "insurance",
  VEHICLE: "vehicle"
};

export const QUERY_TYPES = {
  INSERT: 1,
  DELETE: 2,
  UPDATE: 3,
  SELECT: 4,
  PROJECT: 5,
  JOIN: 6,
  AGGREGATE: 7,
  NESTED: 8,
  DIVISION: 9
};
