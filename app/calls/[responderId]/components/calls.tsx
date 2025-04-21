"use client";

import "@/styles/calls.css";
import { Call } from "@/lib/api-responder";
import List from "./list";
import Info from "./info";
import { useState } from "react";

export default function Calls({ initialCalls }: { initialCalls: Array<Call> }) {
  const [currentCalla, setCurrentCalls] = useState<Array<Call>>(initialCalls);
  const [selectedCall, setSelectedCall] = useState<Call>();

  return (
    <>
      <div className="top-bar">Top Bar</div>
      <div className="layout">
        <div className="left-sidebar">
          <List
            calls={currentCalla}
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
