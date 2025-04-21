"use client";

import { Call } from "@/lib/api-responder";

export default function Info({ call }: { call?: Call }) {
  return (
    <main>
      {call ? (
        <div className={``}>
          <div className="">{call?.Request.requestContext.requestTime}</div>
          <div className="blue button">{call?.Request.httpMethod}</div>
          <div className="">
            <pre>{JSON.stringify(call?.Request.headers, null, 2)}</pre>
          </div>
          <div className="">
            <pre>{call?.Request.body}</pre>
          </div>
        </div>
      ) : (
        <p>Select a call.</p>
      )}
    </main>
  );
}
