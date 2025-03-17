import fetchRequest from "./fetchRequest";

export type RequestParams<T> = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: { [key: string]: any };
  body?: T;
};

export type AjaxInstance = typeof fetchRequest;
