const SHOW_LOGS = true;

const request = ({
  url,
  method,
  headers,
  params,
  requestBody,
}: {
  url: string;
  method?: string;
  headers: unknown;
  params: unknown;
  requestBody: unknown;
}) => {
  if (SHOW_LOGS && import.meta.env.DEV) {
    const style = "color: lightskyblue;";

    console.log(
      `%c\n************ REQUEST ************
      \nURL          : ${url}
      \nMethod       : ${method}
      \nHeaders      : ${JSON.stringify(headers, null, 2)}
      \nParams       : ${JSON.stringify(params, null, 2)}
      \nRequest Body : ${JSON.stringify(requestBody, null, 2)}
      \n*********************************`,
      style,
    );
  }
};
const responseSuccess = ({
  url,
  method,
  headers,
  params,
  responseBody,
  requestBody,
}: {
  url: string;
  method?: string;
  headers?: unknown;
  params?: unknown;
  responseBody?: unknown;
  requestBody?: unknown;
}) => {
  if (SHOW_LOGS && import.meta.env.DEV) {
    const style = "color: greenyellow;";

    console.log(
      `%c\n************ RESPONSE ************
      \nURL          : ${url}
      \nMethod       : ${method}
      \nHeaders      : ${JSON.stringify(headers, null, 2)}
      \nParams       : ${JSON.stringify(params, null, 2)}
      \nRequest Body : ${JSON.stringify(requestBody, null, 2)}
      \nResponse Body: ${JSON.stringify(responseBody, null, 2)}
      \n*********************************`,
      style,
    );
  }
};

const responseError = ({
  url,
  method,
  headers,
  responseBody,
  requestBody,
  status_code,
}: {
  url: string;
  method?: string;
  headers?: unknown;
  responseBody?: unknown;
  requestBody?: unknown;
  status_code?: number;
}) => {
  if (SHOW_LOGS && import.meta.env.DEV) {
    const style = "color: crimson;";

    console.log(
      `%c\n************ ERROR RESPONSE ************
      \nURL          : ${url}
      \nMethod       : ${method}
      \nStatus Code  : ${status_code}
      \nHeaders      : ${JSON.stringify(headers, null, 2)}
      \nRequest Body : ${JSON.stringify(requestBody, null, 2)}
      \nResponse Body: ${JSON.stringify(responseBody, null, 2)}
      \n*********************************`,
      style,
    );
  }
};

const Logger = {
  request,
  responseSuccess,
  responseError,
};

export default Logger;
