export type HttpResponse = {
  statusCode: number;
  message?: string;
  body: any;
}

export type HttpRequest = {
  body?: any;
  headers?: any;
  params?: any;
}