import { http } from '@tauri-apps/api';

export async function yetch({ method, url, body, headers }) {

  try {

    const response = await http.fetch(url, {
      url,
      method,
      body,
      headers,
      responseType: 2
    });

    let result = response.data;
    let status = response.status ?? -1;
    let responseHeaders = response.headers ?? {};

    if (response.headers['content-type']?.includes('application/json')) {
      result = JSON.parse(result);
    }

    return { headers: responseHeaders, status, result };

  }
  catch (error) {
    console.error(error);
    return { status: -1, result: error.message, headers: {} };
  }

}