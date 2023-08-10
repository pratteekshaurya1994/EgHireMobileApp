import axios, {
  AxiosAdapter,
  AxiosBasicCredentials,
  AxiosProxyConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosTransformer,
  CancelToken,
  ResponseType,
} from 'axios';
import * as localStorage from './localStorage';
import {ToastAlert} from '../helpers';

export const defaultHeaders = {
  'Content-Type': 'application/json',
  source: 'mobile',
};

const getAuthHeader = (token: string) => {
  return {Authorization: token};
};
const getLanguageHeader = (language: string) => {
  return {language: language === 'english' ? 'en' : 'hi'};
};
const getHeaders = async (headers: any) => {
  const storedData = await localStorage.getItem('userData1');
  const token = storedData ? JSON.parse(storedData).token : null;
  const language = await localStorage.getItem('languageSelectedData');

  const Authorization = getAuthHeader(token || '');
  const Language = getLanguageHeader(language || 'english');

  headers = {
    ...defaultHeaders,
    ...Authorization,
    ...Language,
    ...headers,
  };
  return headers;
};

const getPayload = (payload: any | FormData, isFormData = false) => {
  if (isFormData) {
    // payload.append('active_user_id', activeUserId);
    return payload;
  } else {
    return {...payload};
  }
};

export interface AxiosOptions {
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  paramsSerializer?: (params: any) => string;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  adapter?: AxiosAdapter;
  auth?: AxiosBasicCredentials;
  responseType?: ResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  maxContentLength?: number;
  validateStatus?: ((status: number) => boolean) | null;
  maxBodyLength?: number;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: AxiosProxyConfig | false;
  cancelToken?: CancelToken;
  decompress?: boolean;
}

const getStateCityInfo = async (url: any) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {}
};

export default {
  getStateCityInfo,
  post: async (
    url: string,
    payload = {},
    headers = {},
    options: AxiosOptions = {},
  ): Promise<any> => {
    const axiosOptions: AxiosRequestConfig = {
      headers: await getHeaders(headers),
      ...options,
    };
    payload = getPayload(payload);

    let request = axios.post(url, payload, axiosOptions);
    return getRequestPromise(request);
  },
  get: async (
    url: string,
    payload = {},
    headers = {},
    options: AxiosOptions = {},
  ): Promise<any> => {
    const axiosOptions: AxiosRequestConfig = {
      headers: await getHeaders(headers),
      params: getPayload(payload),
      method: 'GET',
      ...options,
    };
    let request = axios.get(url, axiosOptions);
    return getRequestPromise(request);
  },
  put: async (
    url: string,
    payload = {},
    headers = {},
    options: AxiosOptions = {},
  ): Promise<any> => {
    const axiosOptions: AxiosRequestConfig = {
      headers: await getHeaders(headers),
      ...options,
      method: 'PUT',
    };
    payload = getPayload(payload);
    // console.log(payload, url, 'payload,put, url');
    let request = axios.put(url, payload, axiosOptions);
    return getRequestPromise(request);
  },
};

const getRequestPromise = (request: Promise<AxiosResponse>) => {
  return new Promise<any>((resolve, reject) => {
    request
      .then(resp => {
        resolve({...resp.data, status: resp.status});
      })
      .catch((err: any) => {
        try {
          const response: any = err.response ? err.response : {data: null};
          let error: any = response.data ? {...response.data} : {status: 500};
          error.status = response.status ? parseInt(response.status) : 500;
          if (error.status === 401) {
            ToastAlert.show(error.error || '');
            console.log('getRequestPromise: error 401');
          }
          reject(error);
        } catch (e) {
          console.log(e, 'Api Function Catch');
        }
      });
  });
};
