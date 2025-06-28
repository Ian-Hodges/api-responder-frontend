"use client";

import { Call } from "@/lib/api-responder";
import "@/calls/styles/info.css";

export default function Info({ call }: { call?: Call }) {
  if (!call) return <p className="info-placeholder">Select a call.</p>;

  const headers = Object.entries(call.request.headers || {});

  return (
    <main className="info-container">
      <div className="info-columns">
        <div className="info-section info-attributes">
          <h2>Attributes</h2>

          <div className="headers-table">
            <div className="header-row">
              <div className="header-key">Time:</div>
              <div className="header-value">
                {call.request.requestContext.requestTime}
              </div>
            </div>
            <div className="header-row">
              <div className="header-key">Method:</div>
              <div
                className={`info-badge method-${call.request.httpMethod.toLowerCase()}`}
              >
                {call.request.httpMethod}
              </div>
            </div>
          </div>
        </div>

        <div className="info-section info-headers">
          <h2>Headers</h2>
          <div className="headers-table">
            {headers.map(([key, value]) => (
              <div key={key} className="header-row">
                <div className="header-key">{key}</div>
                <div className="header-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Body</h2>
        <div className="body-table">
          <div className="body-row">
            <pre className="info-body">{call.request.body}</pre>
          </div>
        </div>
      </div>
    </main>
  );
}
