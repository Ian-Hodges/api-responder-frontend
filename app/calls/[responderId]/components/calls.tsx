"use client";

import "@/styles/calls.css";
import { Call, getAllCallsByResponderId } from "@/lib/api-responder";
import List from "./list";
import Info from "./info";
import { useEffect, useState } from "react";

export default function Calls({ responderId }: { responderId: string }) {
  const [currentCalls, setCurrentCalls] = useState<Array<Call>>([]);
  const [selectedCall, setSelectedCall] = useState<Call>();
  

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
    const interval = setInterval(fetchCalls, 5000);
    return () => clearInterval(interval);
  }, [responderId]);


  return (
    <>
      <div className="top-bar">Top Bar</div>
      <div className="layout">
        <div className="left-sidebar">
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
