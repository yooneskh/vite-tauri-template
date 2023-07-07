import { makeUnifiedNetwork } from 'unified-network';
import { fetch, ResponseType } from '@tauri-apps/api/http';


let requestProcesor;

if (import.meta.env.VITE_NETWORK_PROCESSOR === 'tauri') {
  requestProcesor = async ({ method, url, body, headers }) => {

    let responseStatus = undefined;
    let responseData = undefined;
    let responseHeaders = undefined;


    const response = await fetch(url, {
      method: method.toUpperCase(),
      body,
      headers,
      responseType: ResponseType.Text,
    });


    responseStatus = response.status;
    responseHeaders = response.headers;
    responseData = response.data;

    if (response.ok && responseHeaders['content-type']?.toLowerCase().includes('application/json')) {
      try {
        responseData = JSON.parse(responseData);
      }
      catch (error) {
        throw new Error('could not parse response data ' + error.message);
      }
    }


    return {
      status: responseStatus,
      headers: responseHeaders,
      data: responseData
    };

  };
}


export const $http = makeUnifiedNetwork({
  processor: requestProcesor,
});


export function generalHandleHttp(status, data) {
  if (status !== 200) {
    console.error(data?.message);
    return true;
  }
}