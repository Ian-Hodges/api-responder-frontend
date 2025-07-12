import shortUUID from "short-uuid";
import "./[responderId]/styles/calls.css";
import "./[responderId]/styles/info.css";

export default function App() {
  return (
    <>
      <div className="top-bar">API Responder "?"</div>
      <div className="layout">
        <div className="left-sidebar">
          <div className="auto-refresh"></div>
        </div>
        <div className="content">
          <p className="info-placeholder">
            <a href={`/${shortUUID().new()}`}>Click here to create a responder.</a>
          </p>
        </div>
        <div className="right-sidebar"></div>
      </div>
    </>
  );
}
