import React, { Fragment, useState } from "react";
import { db } from "./firebase_config";
import moment from "moment";
const Journal = ({ journal, timestamp, id }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [inputEdit, setInputEdit] = useState("");
  const deleteJournal = () => {
    db.collection("daily-journal").doc(id).delete();
  };
  const saveJournal = () => {
    db.collection("daily-journal").doc(id).update({
      content: inputEdit,
      timestamp: new Date()
    })
    setEditStatus(!editStatus)
  }
  const showEditStatus = () => {
    if (editStatus === true) {
      return (
        <Fragment>
            <textarea
              className="form-control mb-3"
              id="floatingTextarea2"
              style={{ height: "100px" }}
              defaultValue={journal}
              onChange={(e) => setInputEdit(e.target.value)}
            />
            
          <button
            className="btn btn-primary"
            type="button"
            style={{
              marginRight: "18px",
              borderWidth: "0px",
              borderRadius: "0px",
              background: "var(--green)",
            }}
            onClick={() => saveJournal()}
          >
            Save
          </button>
        </Fragment>
      );
    }
  };

  const time = timestamp.toDate().toDateString();
  return (
    <div className="card">
      <div
        className="card-body"
        style={{ fontFamily: '"Be Vietnam", sans-serif', margin: "0px" }}
      >
        <div className="container">
          <h4 style={{ color: "var(--cyan)" }}>{moment(time).format("l")}</h4>
          <h6 className="text-muted mb-2">
            {moment(time).startOf("hour").fromNow()}
          </h6>
          <p>{journal}</p>
          {showEditStatus()}
          {/* EDIT BUTTON */}
          <button
            className="btn btn-primary"
            type="button"
            style={{
              marginRight: "18px",
              borderWidth: "0px",
              borderRadius: "0px",
              background: "var(--orange)",
            }}
            onClick={() => setEditStatus(!editStatus)}
          >
            Edit
          </button>
          {/* DELETE BUTTON */}
          <button
            className="btn btn-primary"
            type="button"
            style={{
              background: "var(--red)",
              borderRadius: "0px",
              borderWidth: "0px",
            }}
            onClick={deleteJournal}
          >
            Delete
          </button>
        </div>
        <em />
      </div>
    </div>
  );
};

export default Journal;
