import React from "react";

// create a "functional component"
export default function MyCoolMessage(props) {
  console.log("rendering MyCoolMessage");
  return <h1>{props.message}</h1>;
}
