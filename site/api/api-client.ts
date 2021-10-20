interface IApiClientRequestOptions extends Omit<RequestInit, 'body'> {
  data?: RequestInit['body'] | object;
  token?: string;
}

export const SESSION_HEADER_NAME = 'X-A3-SESSION-TOKEN';

export async function client<T = any>(
  endpoint: string,
  apiClientRequestOptions: IApiClientRequestOptions = {},
): Promise<T> {
  const {data, token, headers: customHeaders, ...customConfig} = apiClientRequestOptions;
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': 'application/json',
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(endpoint, config as RequestInit).then(async response => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}
