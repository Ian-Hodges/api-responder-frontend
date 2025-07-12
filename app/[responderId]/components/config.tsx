"use client";

import { z } from "zod";
import { ResponderConfig, updateResponseStatus } from "@/lib/api-responder";
import "../styles/config.css";

const responseStatusSchema = z.object({
  responseStatus: z.coerce
    .number()
    .min(200, "Response status must be greater than 200")
    .max(599, "Response status must be less than 600"),
});

export default function Config({
  responderId,
  responderConfig,
  setResponderConfig,
}: {
  responderId: string;
  responderConfig?: ResponderConfig;
  setResponderConfig: (prev: ResponderConfig) => void;
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Form data:", Object.fromEntries(formData.entries()));

    const parseResult = responseStatusSchema.safeParse({
      responseStatus: formData.get("responseStatus"),
    });
    console.log("Parsed data:", parseResult);

    if (!parseResult.success) {
      console.error("Validation error:", parseResult.error);
      return;
    }

    await updateResponseStatus(responderId, parseResult.data.responseStatus);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="config-item">
        <header>API Url</header>
        <a
          href={`http://api.apiresponder.net/${responderId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          http://api.apiresponder.net/{responderId}
        </a>
        <header>Response Status</header>
        <input
          type="text"
          name="responseStatus"
          value={responderConfig?.responseStatus || ""}
          onChange={(e) =>
            setResponderConfig({
              ...responderConfig,
              responseStatus: Number(e.target.value),
            })
          }
        />
        <div>
          <button type="submit">Update</button>
        </div>
      </div>
    </form>
  );
}
