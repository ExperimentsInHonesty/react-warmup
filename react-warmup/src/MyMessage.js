import React from "react";

//create a "functional component"
export default function MyMessage(props) {
  console.log("rendering MyMessage");
  return <h1>{props.message}</h1>;
}
