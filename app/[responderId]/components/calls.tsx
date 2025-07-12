"use client";

import { Checkbox } from "@aws-amplify/ui-react";
import { Call, ResponderConfig, getAllCallsByResponderId, getConfigByResponderId } from "@/lib/api-responder";
import "../styles/calls.css";
import List from "./list";
import Info from "./info";
import { useEffect, useState } from "react";
import Config from "./config";

export default function Calls({ responderId }: { responderId: string }) {
  const [currentCalls, setCurrentCalls] = useState<Array<Call>>([]);
  const [selectedCall, setSelectedCall] = useState<Call | undefined>();
  const [currentConfig, setCurrentConfig] = useState<ResponderConfig>();
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchCalls = async () => {
    try {
      const res = await getAllCallsByResponderId(responderId);
      setCurrentCalls(res);
    } catch (err) {
      console.error("Failed to fetch calls:", err);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await getConfigByResponderId(responderId);
      setCurrentConfig(res);
    } catch (err) {
      console.error("Failed to fetch config:", err);
    }
  };

  useEffect(() => {
    fetchCalls();
    fetchConfig();

    if (!autoRefresh) return;

    const interval = setInterval(fetchCalls, 5000);
    return () => clearInterval(interval);
  }, [responderId, autoRefresh]);


  return (
    <>
      <div className="top-bar">API Responder "{responderId}"</div>
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
        <div className="right-sidebar">
          <Config
            responderId={responderId}
            responderConfig={currentConfig}
            setResponderConfig={setCurrentConfig}
          />
        </div>
      </div>
    </>
  );
}
