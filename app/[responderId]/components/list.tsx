"use client";

import { deleteCall, Call } from "@/lib/api-responder";
import { DateTime } from "luxon";

export default function List({
  calls,
  setCurrentCalls,
  selectedCall,
  setSelectedCall,
}: {
  calls: Array<Call>;
  setCurrentCalls: (updater: (prev: Call[]) => Call[]) => void;
  selectedCall?: Call;
  setSelectedCall: (call: Call | undefined) => void;
}) {
  async function deleteTodo(responderId: string, id: string) {
    await deleteCall(responderId, id);
    setCurrentCalls((prev) => prev.filter((call) => call.messageId !== id));

    if (selectedCall?.messageId === id) {
      setSelectedCall(undefined);
    }
  }

  return (
    <main>
      {calls.map((call) => (
        <div
          key={call.messageId}
          onClick={() => setSelectedCall(call)}
          className={`response ${
            selectedCall?.messageId === call.messageId ? "selected" : ""
          }`}
        >
          <div className="requestTime">
            {DateTime.fromMillis(call.timeStamp).toFormat("dd/MM/yyyy HH:mm")}
          </div>
          <div
            className={`info-badge method-${call.request.httpMethod.toLowerCase()}`}
          >
            {call.request.httpMethod}
          </div>
          <div className="spacer" />
          <div
            className="grey button delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(call.responderId, call.messageId);
            }}
          >
            <img src="/bin.svg"></img>
          </div>
        </div>
      ))}
    </main>
  );
}
