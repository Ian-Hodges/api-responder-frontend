interface RawCall {
  responderId: string;
  request: string;
  response: string;
  messageId: string;
}

export interface Call {
  responderId: string;
  request: Request;
  response: Response;
  messageId: string;
}

export interface ResponderConfig {
  responseStatus: number;
}

interface Request {
  httpMethod: string;
  headers: Record<string, string>;
  path: string;
  body: string;
  requestContext: RequestContext;
}

type RequestContext = {
  requestTime: string;
};

interface Response {
  headers: Record<string, string>;
  body: string;
}

const url = "https://api.apiresponder.net/calls";

export async function getAllCallsByResponderId(
  responderId: string
): Promise<Call[]> {
  const data = await fetch(url + `/${responderId}`);
  const rawData = (await data.json()) as RawCall[];

  // Parse the Request and Response fields
  return rawData.map((item) => ({
    ...item,
    request: JSON.parse(item.request),
    response: JSON.parse(item.response),
  }));
}

export async function getConfigByResponderId(
  responderId: string
): Promise<ResponderConfig> {
  const data = await fetch(url + `/${responderId}/config`);
  return (await data.json()) as ResponderConfig;
}

export async function deleteCall(
  responderId: string,
  messageId: string
): Promise<RawCall | undefined> {
  const data = await fetch(url + `/${responderId}` + `/${messageId}`, {
    method: "DELETE",
  });
  return await data.json();
}

export async function updateResponseStatus(
  responderId: string,
  responseStatus: number
) {
  console.log("Updating response status for responderId:", responderId, "to status:", responseStatus);
  const data = await fetch(`${url}/${responderId}/responseStatus/${responseStatus}`, {
    method: "POST",
  });
  console.log("Response from updateResponseStatus:", data);
  if (!data.ok) {
    console.error("Failed to update response status:", data.statusText);
    throw new Error(`Failed to update response status: ${data.statusText}`);
  }
}
