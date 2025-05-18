"use client";

import "@/styles/calls.css";
import { Checkbox } from "@aws-amplify/ui-react";
import { Call, getAllCallsByResponderId } from "@/lib/api-responder";
import List from "./list";
import Info from "./info";
import { useEffect, useState } from "react";

export default function Calls({ responderId }: { responderId: string }) {
  const [currentCalls, setCurrentCalls] = useState<Array<Call>>([]);
  const [selectedCall, setSelectedCall] = useState<Call | undefined>();
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchCalls = async () => {
    try {
      const res = await getAllCallsByResponderId(responderId);
      setCurrentCalls(res);
    } catch (err) {
      console.error("Failed to fetch calls:", err);
    }
  };

  useEffect(() => {
    fetchCalls();

    if (!autoRefresh) return;

    const interval = setInterval(fetchCalls, 5000);
    return () => clearInterval(interval);
  }, [responderId, autoRefresh]);


  return (
    <>
      <div className="top-bar">Top Bar</div>
      <div className="layout">
        <div className="left-sidebar">
          <div className="auto-refresh">
            <Checkbox
              id="autoRefresh"
              checked={autoRefresh}
              label="Auto Refresh"
              name="autoRefresh"
              onChange={(e) => setAutoRefresh(e.target.checked)} />
          </div>
          <List
            calls={currentCalls}
            setCurrentCalls={setCurrentCalls}
            selectedCall={selectedCall}
            setSelectedCall={setSelectedCall}
          />
        </div>
        <div className="content">
          <Info call={selectedCall} />
        </div>
        <div className="right-sidebar">Right Sidebar</div>
      </div>
    </>
  );
}
