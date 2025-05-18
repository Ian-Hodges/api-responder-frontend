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
  setCurrentCalls: (
    updater: (prev: Call[]) => Call[]
  ) => void;
  selectedCall?: Call;
  setSelectedCall: (call: Call | undefined) => void;
}) {
  async function deleteTodo(responderId: string, id: string) {
    await deleteCall(responderId, id);
    setCurrentCalls((prev) =>
      prev.filter((call) => call.MessageId !== id)
    );

    if (selectedCall?.MessageId === id) {
      setSelectedCall(undefined);
    }
  }

  function parseCLFDate(clfDateString: string): string {
    const dateRegex =
      /(\d{2})\/([A-Za-z]{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2}) ([+-]\d{4})/;
    const match = clfDateString.match(dateRegex);

    if (!match) {
      throw new Error("Invalid CLF date string format");
    }

    const [, day, month, year, hour, minute, second, timezone] = match;

    const monthMap: { [key: string]: number } = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    const monthIndex = monthMap[month];

    if (monthIndex === undefined) {
      throw new Error(`Invalid month in CLF date string: ${month}`);
    }

    const date = new Date(
      Date.UTC(
        parseInt(year, 10),
        monthIndex,
        parseInt(day, 10),
        parseInt(hour, 10),
        parseInt(minute, 10),
        parseInt(second, 10)
      )
    );

    const timezoneSign = timezone[0] === "+" ? 1 : -1;
    const timezoneHours = parseInt(timezone.slice(1, 3), 10);
    const timezoneMinutes = parseInt(timezone.slice(3), 10);
    const timezoneOffset =
      timezoneSign * (timezoneHours * 60 + timezoneMinutes);

    date.setUTCMinutes(date.getUTCMinutes() - timezoneOffset);

    return DateTime.fromJSDate(date).toFormat("dd/MM/yyyy HH:mm");
  }

  return (
    <main>
      {calls.map((call) => (
        <div
          key={call.MessageId}
          onClick={() => setSelectedCall(call)}
          className={`response ${selectedCall?.MessageId === call.MessageId ? "selected" : ""}`}
        >
          <div className="requestTime">
            {parseCLFDate(call.Request.requestContext.requestTime)}
          </div>
          <div className="blue button">{call.Request.httpMethod}</div>
          <div className="spacer" />
          <div
            className="grey button delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(call.ResponderId, call.MessageId)
            }}
          >
            <img src="/bin.svg"></img>
          </div>
        </div>
      ))}
    </main>
  );
}
