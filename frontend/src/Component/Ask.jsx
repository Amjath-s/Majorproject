import React,{useState} from "react";
import Chatbot from "./Chatbot";
import Community from "./Community";

function Ask() {
    const[activetab,setactivetab]=useState("askai")
  return (
    <>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "red",
          height: "30px",
          padding: "10px",
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            listStyleType: "none",
          }}
        >
          <li>
            <button
              style={{ color: "red", fontSize: "20px" }}
              onClick={() => {
                setactivetab("askai");
              }}
            >
              Ask AI
            </button>
          </li>
          <li>
            <button
              style={{ color: "red", fontSize: "20px" }}
              onClick={() => {
                setactivetab("AskExpert");
              }}
            >
              ASK EXPERT
            </button>
          </li>
        </ul>
      </div>

      <div style={{ backgroundColor: "white" }}>
        {activetab === "askai" ? (
          <Chatbot />
        ) : activetab === "AskExpert" ? (
          <Community />
        ) : null}
      </div>
    </>
  );
}
export default Ask;