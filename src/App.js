import "./App.css";
import "./bootstrap.min.css";
import { db } from "./firebase_config";
import firebase from "firebase";
import { useState, useEffect } from "react";
import Journal from "./Journal";
function App() {
  const [journals, setJournals] = useState([]);
  const [journalInput, setJournalInput] = useState("");
  const [status, setStatus] = useState(false)
  useEffect(() => {
    getJournal();
  }, []); // blank to run only on first launch
  const getJournal = () => {
    db.collection("daily-journal").onSnapshot(function (querySnapshot) {
      setJournals(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          content: doc.data().content,
          timestamp: doc.data().timestamp,
        }))
      );
    });
  }
  const addJournal = (e) =>{
    e.preventDefault();
    if (journalInput === "") {
      alert("Bạn cần nhập vào nhật ký trước khi ấn thêm!");
    } else {
      db.collection("daily-journal").add({
        content: journalInput,
        timestamp: new Date(),
      });
    }
  }
  const showAddJournal = () => {
    if (status === true){
      return (
        
        <div className="add-journal">
          <h1
            style={{
              fontSize: "25px",
              color: "var(--purple)",
              fontFamily: '"Be Vietnam", sans-serif',
              textAlign: "center",
            }}
          >
            <strong>Ngày hôm nay của&nbsp; bạn thế nào?</strong>
          </h1>
          <div className="container">
            <div className="row">
              <div className="col">
                <form style={{ textAlign: "center" }}>
                  <textarea
                    className="form-control"
                    placeholder={"Nhập nội dung nhật ký của bạn vào đây nhé!"}
                    onChange={(e) => setJournalInput(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{
                      margin: "15px",
                      padding: "8px 12px",
                      color: "var(--white)",
                      background: "var(--indigo)",
                      borderWidth: "0px",
                      borderRadius: "0px",
                      width: "166.719px",
                    }}
                    onClick={addJournal}
                  >
                    Thêm nhật ký
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  return (
    <div className="App">
      <div>
        {/* NAVBAR */}
        <nav
          className="navbar navbar-light navbar-expand-md navigation-clean"
          style={{ fontFamily: '"Be Vietnam", sans-serif' }}
        >
          <div className="container">
            <a
              className="navbar-brand"
              href="#"
              style={{ color: "var(--purple)", borderColor: "var(--purple)" }}
            >
              Daily Journal
            </a>
            {/* <button
              data-toggle="collapse"
              className="navbar-toggler"
              data-target="#navcol-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon" />
            </button> */}
            {/* <a href="">Add Journal</a> */}
            <div className="navbar-collapse" id="navcol-1">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <button
                    className="btn btn-primary"
                    style={{
                      margin: "15px",
                      padding: "8px 12px",
                      color: "var(--white)",
                      background: "var(--indigo)",
                      borderWidth: "0px",
                      borderRadius: "0px",
                      width: "166.719px",
                    }}
                    onClick={() => setStatus(!status)}
                  >
                    Add Journal
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* NAVBAR */}

        {showAddJournal()}
        <div className="journal-list">
          {journals.map((journal) => (
            <Journal
              journal={journal.content}
              id={journal.id}
              timestamp={journal.timestamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
