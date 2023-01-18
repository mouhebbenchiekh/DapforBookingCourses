import * as React from "react";
import "../spinner.css" ;

export default function LoadingSpinner({message}) {
  return (
    <>
    <br></br>
    <center>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
        <h3>{message}</h3>
      </div>
    </center>
    </>
  );
}
