interface RawCall {
  ResponderId: string;
  Request: string;
  Response: string;
  MessageId: string;
}

export interface Call {
  ResponderId: string;
  Request: Request;
  Response: Response;
  MessageId: string;
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

const url = "https://api.apiresponder.net";

export async function getAllCallsByResponderId(
  responderId: string
): Promise<Call[]> {
  const data = await fetch(url + `/${responderId}`);
  const rawData = (await data.json()) as RawCall[];

  // Parse the Request and Response fields
  return rawData.map((item) => ({
    ...item,
    Request: JSON.parse(item.Request),
    Response: JSON.parse(item.Response),
  }));
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
