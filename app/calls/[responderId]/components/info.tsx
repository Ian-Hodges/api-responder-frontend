"use client";

import { Call } from "@/lib/api-responder";

export default function Info({ call }: { call?: Call }) {
  return (
    <main>
      {call ? (
        <div className={``}>
          <div className="">{call?.request.requestContext.requestTime}</div>
          <div className="blue button">{call?.request.httpMethod}</div>
          <div className="">
            <pre>{JSON.stringify(call?.request.headers, null, 2)}</pre>
          </div>
          <div className="">
            <pre>{call?.request.body}</pre>
          </div>
        </div>
      ) : (
        <p>Select a call.</p>
      )}
    </main>
  );
}
