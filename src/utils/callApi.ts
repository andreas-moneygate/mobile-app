import AsyncStorage from '@react-native-async-storage/async-storage'
import config from 'config'
import qs from 'query-string'

type Options = {
  headers?: {
    [key: string]: string
  }
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: unknown
  query?: string | object
  isBlob?: boolean
  isText?: boolean
  isArrayBuffer?: boolean
  isAuth?: boolean
}

const callApi = async (endpoint: string, options: Options = {}) => {
  const { headers, method = 'GET', body, query, isBlob, isText, isArrayBuffer } = options
  const accessToken = await AsyncStorage.getItem('@accessToken')

  const url = options.isAuth ? config.apiAuthEndpoint : config.apiEndpoint
  let requestHeaders: { [x: string]: string } = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  }

  let requestBody

  let endpointWithQuery = endpoint

  if (headers) {
    requestHeaders = { ...requestHeaders, ...headers }
  }

  if (body) {
    if (requestHeaders['Content-Type'].includes('application/x-www-form-urlencoded')) {
      const formBody = []
      for (const property in body) {
        const encodedKey = encodeURIComponent(property)
        // @ts-ignore
        const encodedValue = encodeURIComponent(body[property])
        formBody.push(encodedKey + '=' + encodedValue)
      }
      requestBody = formBody.join('&')
    } else {
      requestBody = JSON.stringify(body)
    }
  }

  if (query) {
    if (typeof query === 'object') {
      endpointWithQuery += `?${qs.stringify(query, { encode: false })}`
    } else if (typeof query === 'string') {
      endpointWithQuery += `?${query}`
    }
  }

  const response = await fetch(url + endpointWithQuery, {
    method,
    headers: requestHeaders,
    body: requestBody,
  })

  let payload
  try {
    if (isArrayBuffer) {
      payload = await response.arrayBuffer()
    } else if (isText) {
      payload = await response.text()
    } else if (isBlob) {
      payload = await response.blob()
    } else {
      payload = await response.json()
    }
  } catch {
    payload = {}
  }

  const responseHeaders = {}

  const responseObject = {
    status: response.status,
    ok: response.status >= 200 && response.status < 400,
    headers: responseHeaders,
    payload,
  }

  if (!responseObject.ok) {
    throw responseObject
  }

  return responseObject.payload
}

export default callApi
